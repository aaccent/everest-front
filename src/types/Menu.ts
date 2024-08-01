export interface MenuSubcategory {
  id: number
  imageUrl: null | string
  name: string
  seoUrl: string
  count: number
}

export interface MenuCategory {
  id: number
  iconUrl: string | null
  name: string
  seoUrl: string
  total: number
  subCategories: MenuSubcategory[]
}
