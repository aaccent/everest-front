import { Tag } from '@/types/Tag'
import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { Characteristic } from '@/types/Characteristic'
import { DateString } from '@/types/Date'
import { Pagination } from '@/types/Pagination'

/** Тип квартир. Используется в карточке ЖК на странице категории со списком ЖК */
export interface FlatType {
  id: string
  name: string
  minArea: number
  minPrice: number
}

/** Карточка ЖК на странице категории со списком ЖК */
export interface ComplexObject {
  id: number
  name: string
  address: string | null
  minPrice: number
  minPriceDiscount: number | null
  tags: Tag[] | null
  status: DateString | null
  seoUrl: string
  mainImg: string | null
  description: string | null
  developerLogo: string | null
  presentationLink: string | null
  objectsType: FlatType[]
}

/** Категория ЖК из АПИ */
export type ComplexesCategoryFromAPI = {
  id: number
  name: string
  seoUrl: string
  count: number
  description: string | null
  breadcrumbs: BreadcrumbItem[]
  categories: ComplexObject[]
  objects: []
} & Pagination

export type ComplexesCategory = Omit<ComplexesCategoryFromAPI, 'categories' | 'objects'> & {
  objects: ComplexObject[]
  categories: []
}

/** Объекты типа "Планировка" */
export interface LayoutObject {
  id: number
  /** Для указания title в мета тэгах */
  title: string | null
  h1: string | null
  seoUrl: string
  name: string
  area: number
  /** Для указания description в мета тэгах */
  description: string | null
  price: number
  priceDiscount: number | null
  dealType: string
  houseNumber: number
  section: string
  characteristics: Characteristic[]
  gallery: string[]
  address: string
}

/** Информация о ЖК */
export interface Complex {
  id: number
  name: string
  seoUrl: string
  minPrice: number
  mainImg: string | null
  description: string | null
  developerLogo: string | null
  presentationLink: string | null
  characteristics: Characteristic[]
  address: string | null
  genPlanImg: string | null
}

/** Детальная ЖК из АПИ */
export interface DetailComplexFromAPI {
  breadcrumbs: BreadcrumbItem[]
  complex: Complex
  objectCount: number
  houseNumbers: string[]
  gallery: string[]
}

export type DetailComplex = Complex & Omit<DetailComplexFromAPI, 'complex'>
