import { ICONS } from './icons-paths'

export * from './icons-paths'

export type IconName = keyof typeof ICONS

type IconsNameObj = {
  [key in IconName]: string
}

export function convertToTailwindName(name: string) {
  return name.toLowerCase().replace('_', '-')
}

export const ICONS_NAME: IconsNameObj = Object.fromEntries(
  Object.keys(ICONS).map(function (name) {
    return [name, `icon-${convertToTailwindName(name)}`]
  }),
) as IconsNameObj
