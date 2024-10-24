import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import { ComplexesCategory } from '@/types/catalog/Complex'
import { Pagination } from '@/types/Pagination'

/** Используется для поля `categories` в {@link Category} и других подобных типах */
export interface Subcategory {
  id: number
  name: string
  description: string | null
  seoUrl: string
  type: string
  imageUrl: string | null
  count: number
}

export type Category = {
  id: number
  name: string
  seoUrl: string
  description: string | null
  count: number
  breadcrumbs: BreadcrumbItem[]
  categories: Subcategory[]
  objects: DefaultObject[]
} & Pagination

/** Тип подкатегории после преобразований */
export type SubcategoryLikeCategory = Subcategory & {
  breadcrumbs: BreadcrumbItem[]
  categories?: never
  objects: DefaultObject[]
  parent: Pick<Category, 'id' | 'name' | 'seoUrl' | 'count' | 'breadcrumbs'>
} & Pagination

export type AnyCategory = Category | SubcategoryLikeCategory | ComplexesCategory
export type AnyCategoryExceptComplexes = Category | SubcategoryLikeCategory

/** Используется как плейсхолдер для возможного рефактора типизации фильтров */
export type FilterRequestParam = object[] | null
/** Используется как плейсхолдер для возможного рефактора типизации сортировки */
export type SortRequestParam = string | null

// TODO: rename into FilterRequest and split sort and filter on different interfaces
export interface CategoryRequestWithFilters {
  filter?: FilterRequestParam
  sort?: SortRequestParam
}

export interface CategoryRequestWithPagination {
  page?: number
  perPage?: number
}
