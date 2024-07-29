import { Category } from '@/types/Category'
import { SubCategory } from '@/types/SubCategory'

export function generateCategoryLink(item: Category | SubCategory, parent?: Category) {
  let link = '/catalog'
  if (parent) link += `/${parent.seoUrl}`
  link += `/${item.seoUrl}`
  return link
}
