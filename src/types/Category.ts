import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { DetailComplex } from '@/types/Complex'

export interface RawCategory {
  id: string
  name: string
  code: string
  seoUrl: string
  type: string
  description: string | null
  seoTitle?: string | null
  seoDescription?: string | null
}

type TopLevelCategory = Pick<RawCategory, 'name' | 'seoDescription' | 'seoTitle' | 'seoUrl' | 'code' | 'description'>

export type Category<
  TCategories extends object | false = object,
  TObjects extends object | false = false,
> = TopLevelCategory & {
  breadcrumbs: BreadcrumbItem[]
  categories: TCategories extends false ? [] : TCategories[]
  objects: TObjects extends false ? [] : TObjects[]
}

export type SubCategory<TObjects extends object | false = false> = RawCategory & {
  breadcrumbs: BreadcrumbItem[]
  categories?: []
  complex?: DetailComplex
  objects: TObjects extends false ? [] : TObjects[]
}

export type AnyCategory = Category<any, any> | SubCategory<any>
