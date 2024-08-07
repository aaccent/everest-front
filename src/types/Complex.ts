import { Tag } from '@/types/Tag'
import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { CategoryObject } from '@/types/CategoryObject'

export interface FlatTypes {
  id: string
  name: string
  minArea: string // Нужен number
  minPrice: string // Нужен number
}

export interface Complex {
  id: string
  name: string
  address?: string
  code: string
  minPrice?: number
  status?: number
  tags?: Tag[]
  objectsType: FlatTypes[]
  mainImg: string
  description: string
  developerLogo: string
  presentationLink: string
  priceDiscount?: number
}

export interface ComplexInDetailed {
  name: string
  seoUrl: string
  mainImg: string
  description: string
  developerLogo: string
  presentationLink: string
  minArea?: number
  maxArea?: number
  minPrice?: number
  address?: string
  characteristics: [Characteristics[]]
}

export interface Characteristics {
  name: string
  value: string | number
}

export interface LayoutObject extends CategoryObject {
  id: number
  title: string
  h1: string | null
  seoUrl: string
  name: string
  description: string
  priceDiscount: string
  dealType: 'sale' | 'rent'
  houseNumber: number
  characteristics: Characteristics[]
  gallery: string[]
}

export interface ComplexDetailedHouse {
  objects: LayoutObject[]
}

export type ComplexDetailed = {
  breadcrumbs: BreadcrumbItem[]
  complex: ComplexInDetailed
  gallery?: string[]
  objects: ComplexDetailedHouse[]
}
