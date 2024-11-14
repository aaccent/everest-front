import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { ROUTES } from '@/globals/paths.js'
import { RealtorCardType } from '@/types/Realtor'

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
  typeObject: string
  categoryObject: string | null
}

function generateCategoryLinkFromObject(item: ObjectForLinkGeneration | undefined) {
  if (!item) return '#'

  let link = ROUTES.CATALOG
  link += `/${item.typeObject}`

  if (item.categoryObject) {
    link += `/${item.categoryObject}`
  }

  return link
}

export function generateObjectLink(
  item: ObjectForLinkGeneration | undefined,
  category?: CategoryForGeneratingLink | undefined,
) {
  if (!item) return '#'

  let link = category ? generateCategoryLink(category) : generateCategoryLinkFromObject(item)

  link += '/object'
  link += `/${item.seoUrl}`

  return link
}

export function createComplexLink(item: Pick<ObjectForLinkGeneration, 'seoUrl'>) {
  let link = ROUTES.COMPLEXES
  link += `/${item.seoUrl}`
  return link
}

export function createRealtorLink(realtorCode: RealtorCardType['code']) {
  let link = ROUTES.REALTORS
  link += `/${realtorCode}`
  return link
}
