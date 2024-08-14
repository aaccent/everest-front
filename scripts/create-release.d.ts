type SymVerType = 'major' | 'minor' | 'patch'

interface SymVer {
  major: number
  minor: number
  patch: number
  get version(): string
  newMajor(): string
  newMinor(): string
  newPatch(): string
}

interface PackageJSON {
  version: string
  name: string
  repository: string
}
