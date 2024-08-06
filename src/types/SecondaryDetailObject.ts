import { BreadcrumbItem } from '@/types/Breadcrumbs'

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

export interface SecondaryObjectPropertyValue {
  name: string
  value: string | number
}

export interface SecondaryObjectProperty {
  name: string
  characteristics: SecondaryObjectPropertyValue[]
}

export interface RawSecondaryDetailObject {
  breadcrumbs: BreadcrumbItem[]
  object: RawSecondaryObject
  gallery: string[]
  characteristics: SecondaryObjectProperty[]
}

export interface SecondaryDetailObject extends RawSecondaryObject {
  breadcrumbs: RawSecondaryDetailObject['breadcrumbs']
  gallery: RawSecondaryDetailObject['gallery']
  characteristics: RawSecondaryDetailObject['characteristics']
}
