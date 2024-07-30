type ItemWithCode = {
  code?: string
  seoUrl?: string
}

export function generateCategoryLink(item: ItemWithCode, parent?: ItemWithCode) {
  let link = '/catalog'
  if (parent) link += `/${item.seoUrl || parent.code}`
  link += `/${item.seoUrl || item.code}`
  return link
}
