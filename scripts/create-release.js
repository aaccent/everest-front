import { Octokit } from '@octokit/core'
import { simpleGit } from 'simple-git'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

const PACKAGE_FILE_PATH = join(process.cwd(), 'package.json')
const DEV_BRANCH_NAME = 'dev'
const MASTER_BRANCH_NAME = 'master'
const REMOTE_NAME = 'origin'

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
  const currentVersion = myPackage.version.match(/(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-beta\.(?<beta>\d+))?/)

  const major = Number(currentVersion.groups.major)
  const minor = Number(currentVersion.groups.minor)
  const patch = Number(currentVersion.groups.patch)

  const betaVersion = Number(currentVersion.groups.beta)
  const isBeta = !Number.isNaN(betaVersion)

  return {
    major,
    minor,
    patch,
    beta: isBeta ? betaVersion : null,
    get version() {
      let version = `${this.major}.${this.minor}.${this.patch}`
      if (this.isBeta()) {
        version += `-beta.${this.beta}`
      }

      return version
    },
    newMajor() {
      this.major += 1
      this.minor = 0
      this.patch = 0
      this.beta = null
      return this.version
    },
    newMinor() {
      this.minor += 1
      this.patch = 0
      this.beta = null
      return this.version
    },
    newPatch() {
      this.patch += 1
      this.beta = null
      return this.version
    },
    isBeta() {
      return this.beta !== null
    },
    newBeta() {
      if (this.isBeta()) {
        this.beta += 1
      } else {
        this.beta = 0
      }

      return this.version
    },
    removeBeta() {
      this.beta = null
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
  const parsedArgs = rawArgs.map((arg) => arg.replace('--', '').split('=')).map(([name]) => [name, name])

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
 * @param {string} target - Название ветки для создания релиза
 * @param {boolean} prerelease - Пре релиз или нет
 * @return {Promise<string>} - Ссылку для загрузки файлов в релиз
 */
async function createRelease(octokit, { owner, repo, versionTag, target, prerelease }) {
  const release = await octokit.request('POST /repos/{owner}/{repo}/releases', {
    owner: owner,
    repo: repo,
    tag_name: versionTag,
    target_commitish: target,
    name: versionTag,
    body: '',
    draft: false,
    prerelease,
    generate_release_notes: false,
  })

  return release.data.upload_url
}

/**
 * Создаёт Пулл реквест из ветки `from` в ветку 'master' и заголовком `title`
 * @param {Octokit} octokit - Сессия гитхаба
 * @param {string} owner - Владелец репозитория
 * @param {string} repo - Название репозитория
 * @param {string} title - Заголовок Пулл реквеста
 * @param {string} body - Текст Пулл реквеста
 * @param {string} from - ветка удаленного репозитория из которого сливаются изменения
 * @param {string} to - ветка удаленного репозитория в который сливаются изменения
 * @return {Promise<{link: string; number: number}>}
 */
async function createPullRequestToMaster(octokit, { owner, repo, body, title, from, to }) {
  const pr = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    title,
    body,
    head: from,
    base: to,
  })

  return { link: pr.data.html_url, number: pr.data.number }
}

/**
 * Мерджит ПР по номеру `pull_number`
 * @param {Octokit} octokit
 * @param {string} owner
 * @param {string} repo
 * @param {number} pull_number
 * @return {Promise<void>}
 */
async function mergePullRequest(octokit, { owner, repo, pull_number }) {
  await octokit.request('PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge', {
    owner,
    repo,
    pull_number,
  })
}

/**
 * @param {SymVer} symVer
 * @param {SymVerType} type
 * @param {boolean} needAddBeta - Если `true`, то к версии добавится beta строка, иначе не добавится.
 * Если в `type` указано `beta`, то beta строка добавится в любом случае.
 * @param {boolean} needRemoveBeta - Если `true`, то убирает с текущей версии пометку о бете.
 * Перезаписывает действие от опции `needAddBeta` и убирает бету если указано `'beta'` в `type`.
 */
function changeVersion({ symVer, type, needAddBeta, needRemoveBeta }) {
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
    case 'beta':
      symVer.newBeta()
      break
  }

  if (needAddBeta) {
    symVer.newBeta()
  }

  if (needRemoveBeta) {
    symVer.removeBeta()
  }
}

/** @param {string} version */
async function createReleaseBranch(version) {
  const newBranchName = `release/${version}`
  await simpleGit().checkoutLocalBranch(newBranchName)
  console.info('Create branch %s', newBranchName)
  return newBranchName
}

void (async function () {
  if (!process.env.GITHUB_TOKEN) {
    return console.error(
      'Необходимо указать гитхаб токен в env переменной GITHUB_TOKEN. Это можно сделать через cli или в файле .env.local. Ни в коем случае не указывайте токен в .env',
    )
  }

  const status = await simpleGit().status()

  if (status.modified.length) {
    return console.error('У вас есть незафиксированные изменения. Сначала сделайте git commit')
  }

  const currentBranch = (await simpleGit().branchLocal()).current
  await simpleGit().checkout(MASTER_BRANCH_NAME).fetch().pull()
  console.info('Checkout, fetched and pulled %s', MASTER_BRANCH_NAME)

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
  const hasVersion = Boolean(cliArgs.major || cliArgs.minor || cliArgs.patch)

  if (!hasVersion && !cliArgs.beta && !cliArgs.stable) {
    return console.error(
      'Необходимо выбрать тип версии:\n',
      'pnpm run release -- --major\n',
      'pnpm run release -- --minor\n',
      'pnpm run release -- --patch\n',
      'pnpm run release -- --beta\n',
    )
  }

  const isBeta = Boolean(cliArgs.beta)
  const versionType = cliArgs.major || cliArgs.minor || cliArgs.patch || cliArgs.beta

  changeVersion({
    symVer,
    type: versionType,
    needAddBeta: isBeta && hasVersion,
    needRemoveBeta: 'stable' in cliArgs,
  })

  const newBranchName = await createReleaseBranch(`v${symVer.version}`)

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

  await simpleGit().push(REMOTE_NAME, newBranchName)
  console.info('Commited and pushed new version with tag %s', versionTag)

  await simpleGit().checkout(currentBranch)
  console.info('Checkout back to %s branch', currentBranch)

  const { firstPRLink, number: prNumber } = await createPullRequestToMaster(octokit, {
    ...githubLink,
    title: versionTag,
    body: 'Автоматический ПР с измененной версией в `package.json`',
    from: newBranchName,
    to: MASTER_BRANCH_NAME,
  })
  console.info('Created PR from branch %s to master. link:\n%s', newBranchName, firstPRLink)

  await mergePullRequest(octokit, { ...githubLink, pull_number: prNumber })
  console.info('Merged PR by number #%d', prNumber)

  const { secondPRLink } = await createPullRequestToMaster(octokit, {
    ...githubLink,
    title: versionTag,
    body: 'Автоматический ПР после релиза`',
    from: MASTER_BRANCH_NAME,
    to: DEV_BRANCH_NAME,
  })
  console.info(
    'Created PR from branch %s to %s. link:\n%s\nPlease check and merge',
    MASTER_BRANCH_NAME,
    DEV_BRANCH_NAME,
    secondPRLink,
  )

  // Создаём релиз
  await createRelease(octokit, {
    ...githubLink,
    versionTag,
    target: newBranchName,
    prerelease: isBeta,
  })
  console.info('Created release for version v%s', symVer.version)
})()
