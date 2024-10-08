import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { ROUTES } from '@/globals/paths.js'

interface CategoryWithSeoUrl {
  seoUrl: string
}

interface CategoryWithBreadcrumbs {
  breadcrumbs: BreadcrumbItem[]
}

export type CategoryForGeneratingLink = CategoryWithSeoUrl | CategoryWithBreadcrumbs

export function generateCategoryLink(item: CategoryForGeneratingLink | undefined, parent?: CategoryWithSeoUrl) {
  if (!item) return '#'

  let link = ROUTES.CATALOG

  if ('breadcrumbs' in item) {
    link += item.breadcrumbs.map((item) => `/${item.seo}`).join('')
    return link
  }

  if (parent) link += `/${parent.seoUrl}`
  link += `/${item.seoUrl}`
  return link
}

type ObjectForLinkGeneration = {
  seoUrl: string
}

export function generateObjectLink(
  item: ObjectForLinkGeneration | undefined,
  category: CategoryForGeneratingLink | undefined,
) {
  if (!category || !item) return '#'

  let link = generateCategoryLink(category)
  link += '/object'
  link += `/${item.seoUrl}`

  return link
}

export function createComplexLink(item: ObjectForLinkGeneration) {
  let link = ROUTES.COMPLEXES
  link += `/${item.seoUrl}`
  return link
}
