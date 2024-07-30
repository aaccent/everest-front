import { BreadcrumbItem } from '@/types/Breadcrumbs'

export interface RawCategory {
  id: string
  name: string
  code: string
  seoUrl?: string
  type: string
  description: string | null
  seoTitle?: string | null
  seoDescription?: string | null
}

export type SubCategory<TObjects extends object | false = false> = RawCategory & {
  breadcrumbs: BreadcrumbItem[]
  objects: TObjects extends false ? [] : TObjects[]
}

export type Category<TCategories extends object | false = object, TObjects extends object | false = false> = Pick<
  RawCategory,
  'name' | 'seoDescription' | 'seoTitle'
> & {
  breadcrumbs: BreadcrumbItem[]
  categories: TCategories extends false ? [] : TCategories[]
  objects: TObjects extends false ? [] : TObjects[]
}

export type AnyCategory = Category<any, any> | SubCategory<any>
