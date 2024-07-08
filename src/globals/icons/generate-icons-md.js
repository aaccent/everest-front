import { ICONS } from './icons-paths.js'
import { writeFile, appendFile } from 'node:fs/promises'

const FILE = './icons.md'

void (async function () {
  await writeFile(FILE, '# Иконки и их классы\n')

  Object.entries(ICONS).map(async function ([name, cssUrlImage]) {
    const base64Image = cssUrlImage.match(/url\(["'](.+)["']\)/)?.[1]
    appendFile(FILE, `* <img src="${base64Image}"> - icon-${name.toLowerCase().replace('_', '-')}\n`)
  })
})()
