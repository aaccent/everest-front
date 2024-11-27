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

export interface SaleRentCategory {
  id: number
  imageUrl: string
  name: string
  seoUrl: string
  count: number
  type: string
}
