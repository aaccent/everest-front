import { Octokit } from '@octokit/core'
import { simpleGit } from 'simple-git'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

const PACKAGE_FILE_PATH = join(process.cwd(), 'package.json')
const MASTER_BRANCH_NAME = 'master'

function getPackageFile() {
  const rawPackageFile = readFileSync(PACKAGE_FILE_PATH).toString()
  return JSON.parse(rawPackageFile)
}

function getGithubLinkFromPackage(myPackage) {
  if (!myPackage.repository) throw new Error('В package.json не указан repository. Он должен начинаться с github:')
  const githubPath = myPackage.repository.replace('github:', '').split('/')
  return { owner: githubPath[0], repo: githubPath[1] }
}

/**
 * @param {PackageJSON} myPackage
 * @return {SymVer}
 */
function getSymVerFromPackage(myPackage) {
  const currentVersion = myPackage.version.replace(/-.*/, '').split('.').map(Number)

  const major = currentVersion[0]
  const minor = currentVersion[1]
  const patch = currentVersion[2]

  return {
    major,
    minor,
    patch,
    get version() {
      return `${this.major}.${this.minor}.${this.patch}`
    },
    newMajor() {
      this.major += 1
      this.minor = 0
      this.patch = 0
      return this.version
    },
    newMinor() {
      this.minor += 1
      this.patch = 0
      return this.version
    },
    newPatch() {
      this.patch += 1
      return this.version
    },
  }
}

function writeVersionToPackage(newVersion) {
  const packageFile = getPackageFile()
  packageFile.version = newVersion

  writeFileSync(PACKAGE_FILE_PATH, JSON.stringify(packageFile, undefined, 2))
}

function parseCLIArgs() {
  const rawArgs = process.argv.slice(2)
  const parsedArgs = rawArgs.map((arg) => arg.replace('--', '').split('=')).map(([name, value]) => [name, name])

  return Object.fromEntries(parsedArgs)
}

/**
 * Проверяет доступ владельца `owner` к репозиторию `repo` на права записи
 * @param {Octokit} octokit - Сессия гитхаба
 * @param {string} owner - Владелец репозитория
 * @param {string} repo - Название репозитория
 * @return {Promise<boolean>} - `true` если у пользователя есть права записи, иначе `false`
 */
async function isHaveAccessToRepo(octokit, { owner, repo }) {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
    })

    return res.data.permissions.push
  } catch (error) {
    if (error.status === 404) {
      throw new Error(`Репозитория ${owner}/${repo} не существует или вы не имеете к нему доступ`)
    }
  }
}

/**
 * Создаёт релиз с названием и тэгом `versionTag` в
 * репозитории `repo` владельца `owner`
 * @param {Octokit} octokit - Сессия гитхаба
 * @param {string} owner - Владелец репозитория
 * @param {string} repo - Название репозитория
 * @param {`v${string}`} versionTag - Текст для тэга и названия релиза
 * @return {Promise<string>} - Ссылку для загрузки файлов в релиз
 */
async function createRelease(octokit, { owner, repo, versionTag }) {
  const release = await octokit.request('POST /repos/{owner}/{repo}/releases', {
    owner: owner,
    repo: repo,
    tag_name: versionTag,
    target_commitish: MASTER_BRANCH_NAME,
    name: versionTag,
    body: '',
    draft: false,
    prerelease: false,
    generate_release_notes: false,
  })

  return release.data.upload_url
}

/**
 * @param {SymVer} symVer
 * @param {SymVerType} type
 */
function changeVersion(symVer, type) {
  switch (type) {
    case 'major':
      symVer.newMajor()
      break
    case 'minor':
      symVer.newMinor()
      break
    case 'patch':
      symVer.newPatch()
      break
  }
}

async function checkIsCurrentBranchMaster() {
  const branches = await simpleGit().branchLocal()

  if (branches.current !== MASTER_BRANCH_NAME) {
    console.error('Текущая ветка должна быть master. Сейчас выбрана %s', branches.current)
  }

  return branches.current === MASTER_BRANCH_NAME
}

void (async function () {
  if (!process.env.GITHUB_TOKEN) {
    return console.error(
      'Необходимо указать гитхаб токен в env переменной GITHUB_TOKEN. Это можно сделать через cli или в файле .env.local. Ни в коем случае не указывайте токен в .env',
    )
  }

  const branchCheck = await checkIsCurrentBranchMaster()
  if (!branchCheck) return

  const status = await simpleGit().status()

  if (status.modified.length) {
    return console.error('У вас есть незафиксированные изменения. Сначала сделайте git commit')
  }

  // Получаем package.json файл и ссылку на репу гитхаба
  const myPackage = getPackageFile()
  const githubLink = getGithubLinkFromPackage(myPackage)
  console.info('Github repo %s/%s', githubLink.owner, githubLink.repo)

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

  const haveWriteAccess = await isHaveAccessToRepo(octokit, { ...githubLink })
  if (!haveWriteAccess) {
    return console.error('У вас нет прав на создание релизов в репозитории')
  }

  // Получаем текущую версию
  const symVer = getSymVerFromPackage(myPackage)

  // Выставляем новую версию
  const cliArgs = parseCLIArgs()
  if (!cliArgs.major && !cliArgs.minor && !cliArgs.patch) {
    return console.error(
      'Необходимо выбрать тип версии:\n',
      'pnpm run release -- --major\n',
      'pnpm run release -- --minor\n',
      'pnpm run release -- --patch\n',
    )
  }

  changeVersion(symVer, cliArgs.major || cliArgs.minor || cliArgs.patch)

  /** @type {`v${string}`} */
  const versionTag = `v${symVer.version}`
  writeVersionToPackage(symVer.version)
  console.info('New version %s', symVer.version)

  // Коммитим изменение package.json, создаём тэг и пушим
  await simpleGit().add('package.json').commit(versionTag)
  try {
    await simpleGit().addTag(versionTag)
  } catch (error) {
    if (error.message.includes('already exists')) {
      return console.error('Тэг %s уже существует. Измените версию в package.json и попробуйте снова', versionTag)
    }

    throw error
  }

  await simpleGit().push()
  console.info('Commited and pushed new version with tag %s', versionTag)

  // Создаём релиз
  const uploadUrl = await createRelease(octokit, { ...githubLink, versionTag })
  console.info('Create release for version v%s', symVer.version)
})()
