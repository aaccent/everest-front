import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { Characteristic } from '@/types/Characteristic'
import { DateString } from '@/types/Date'

interface DetailObjectBaseInfo {
  id: number
  h1: string | null
  name: string
  seoDescription: string | null
  address: string | null
  description: string | null
  publicationTime: DateString
  priceForMeter: number
  price: number
}

export interface DetailDefaultObjectProperty {
  name: string
  characteristics: Characteristic[]
}

export interface DetailDefaultObjectFromAPI {
  breadcrumbs: BreadcrumbItem[]
  object: DetailObjectBaseInfo
  gallery: string[]
  characteristics: DetailDefaultObjectProperty[]
}

export type DetailDefaultObject = DetailObjectBaseInfo & Omit<DetailDefaultObjectFromAPI, 'object'>
