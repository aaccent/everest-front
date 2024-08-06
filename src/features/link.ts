import { AnyCategory } from '@/types/Category'
import { BreadcrumbItem } from '@/types/Breadcrumbs'

type ObjectForLinkGeneration = {
  code?: string
  seoUrl?: string
}

type CategoryForLinkGeneration = ObjectForLinkGeneration & {
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

  if (parent) link += `/${parent.seoUrl || parent.code}`
  link += `/${item.seoUrl || item.code}`
  return link
}

export function generateObjectLink(item: ObjectForLinkGeneration, category: CategoryForLinkGeneration) {
  if (!category) return '#'

  let link = generateCategoryLink(category)

  if (category.breadcrumbs!.length === 1) {
    link += '/object'
  }

  link += `/${item.seoUrl || item.code}`

  return link
}

export const COMPLEXES_CATEGORY: CategoryForLinkGeneration = {
  breadcrumbs: [
    {
      name: '',
      seo: 'new-building',
    },
    {
      name: '',
      seo: 'complexes',
    },
  ],
}
