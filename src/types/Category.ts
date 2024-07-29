import { SubCategory } from '@/types/SubCategory'

export interface Category {
  id: string
  iconUrl: null | string
  name: string
  seoUrl: string
  seoTitle?: string | null
  seoDescription?: string | null
  subCategories: SubCategory[]
  total: number
}
