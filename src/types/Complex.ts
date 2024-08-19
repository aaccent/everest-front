import { Tag } from '@/types/Tag'
import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { ObjectCard } from '@/types/ObjectCard'
import { Characteristic } from '@/types/Characteristic'

export interface FlatTypes {
  id: string
  name: string
  minArea: string // Нужен number
  minPrice: string // Нужен number
}

export interface ComplexCard {
  id: number
  name: string
  minPrice: number
  minPriceDiscount: number | null
  tags: Tag[]
  status: string
  seoUrl: string
  mainImg: string
  description: string
  developerLogo: string
  presentationLink: string
  objectsType: FlatTypes[]
  address: string | null
}

export type LayoutObject = Pick<ObjectCard, 'id' | 'seoUrl' | 'name' | 'description' | 'priceDiscount'> & {
  title: string
  h1: string
  dealType: string
  houseNumber: number
  characteristics: Characteristic[]
  gallery: string[]
  address: string | null
  price: number
}

export interface RawComplex {
  id: number
  name: string
  code: string
  mainImg: string
  description: string
  developerLogo: string
  presentationLink: string
  characteristics: [Characteristic[]]
}

export interface DetailComplexHouse {
  objects: LayoutObject[]
}

export interface RawDetailComplex {
  breadcrumbs: BreadcrumbItem[]
  complex: RawComplex
  gallery: string[]
  objects: DetailComplexHouse[]
}

export type DetailComplex = RawComplex & Omit<RawDetailComplex, 'complex'>
