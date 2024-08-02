import { AnyCategory } from '@/types/Category'

type ItemWithCode = {
  code?: string
  seoUrl?: string
}

export function generateCategoryLink(item: ItemWithCode | AnyCategory, parent?: ItemWithCode) {
  let link = '/catalog'

  if ('breadcrumbs' in item && !parent) {
    link += item.breadcrumbs.map((item) => `/${item.seo}`).join('')
    return link
  }

  if (parent) link += `/${parent.seoUrl || parent.code}`
  link += `/${item.seoUrl || item.code}`
  return link
}

export function generateObjectLink(item: ItemWithCode, category: AnyCategory) {
  let link = generateCategoryLink(category)

  if (category.breadcrumbs.length === 1) {
    link += '/object'
  }

  link += `/${item.seoUrl || item.code}`

  return link
}
