import { BreadcrumbItem } from '@/types/Breadcrumbs'

export interface SecondaryObjectProperty {
  name: string
  value: string
}

export interface SecondaryDetailObject {
  breadcrumbs: BreadcrumbItem[]
  name: string
  h1: string
  title: string
  description: string
  address: string
  text: string
  gallery: string[]
  id: number
  publicationTime: string
  pricePerMeter: number
  characteristics: SecondaryObjectProperty[]
}
