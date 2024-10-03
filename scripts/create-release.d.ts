type SymVerType = 'major' | 'minor' | 'patch' | 'beta'

interface SymVer {
  major: number
  minor: number
  patch: number
  beta: number | null
  get version(): string
  newMajor(): string
  newMinor(): string
  newPatch(): string
  isBeta(): boolean
  newBeta(): string
}

interface PackageJSON {
  version: string
  name: string
  repository: string
}
