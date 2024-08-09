import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { Characteristic } from '@/types/Characteristic'

export interface RawSecondaryObject {
  id: number
  h1: string
  name: string
  description: string
  mainImageUrl: string
  address: string
  text: string
  publicationTime: string
  priceForMeter: number
  price: number
}

export interface SecondaryObjectProperty {
  name: string
  characteristics: Characteristic[]
}

export interface RawSecondaryDetailObject {
  breadcrumbs: BreadcrumbItem[]
  object: RawSecondaryObject
  gallery: string[]
  characteristics: SecondaryObjectProperty[]
}

export type SecondaryDetailObject = RawSecondaryObject & Omit<RawSecondaryDetailObject, 'object'>
