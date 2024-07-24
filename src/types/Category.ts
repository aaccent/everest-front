import { SubCategory } from '@/types/SubCategory'

export interface Category {
  id: string
  iconPath: null | string
  name: string
  code: string
  seoTitle?: string | null
  seoDescription?: string | null
  subCategoryList: SubCategory[]
}
