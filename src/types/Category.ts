import { SubCategory } from '@/types/SubCategory'

export interface Category {
  id: number
  iconUrl: null | string
  title: string
  seoUrl: string
  seoTitle?: string | null
  seoDescription?: string | null
  subCategories: SubCategory[]
}
