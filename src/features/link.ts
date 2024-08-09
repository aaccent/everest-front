import { AnyCategory } from '@/types/Category'
import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { PATHS } from '@/globals/paths.js'

type ObjectForLinkGeneration = {
  seoUrl?: string
}

export type CategoryForLinkGeneration = ObjectForLinkGeneration & {
  breadcrumbs?: BreadcrumbItem[]
}

export function generateCategoryLink(
  item: CategoryForLinkGeneration | AnyCategory,
  parent?: CategoryForLinkGeneration,
) {
  if (!item) return '#'

  let link = '/catalog'

  if ('breadcrumbs' in item && !parent) {
    link += item.breadcrumbs!.map((item) => `/${item.seo}`).join('')
    return link
  }

  if (parent) link += `/${parent.seoUrl}`
  link += `/${item.seoUrl}`
  return link
}

export function generateObjectLink(item: ObjectForLinkGeneration, category: CategoryForLinkGeneration) {
  if (!category) return '#'

  let link = generateCategoryLink(category)

  if (category.breadcrumbs!.length === 1) {
    link += '/object'
  }

  link += `/${item.seoUrl}`

  return link
}

export function createComplexLink(item: ObjectForLinkGeneration) {
  let link = `/${PATHS.CATALOG}/complexes`
  link += `/${item.seoUrl}`
  return link
}
