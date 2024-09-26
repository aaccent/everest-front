import { Tag } from '@/types/Tag'

export interface ObjectCard {
  id: number
  name: string
  typeObject: string
  description: string
  price: number
  priceDiscount: number | null
  userId: number | null
  mainImagePath?: string | null
  mainImageUrl: string | null
  gallery: string[] | null
  publicationTime: string
  address: string | null
  seoUrl: string
  tags: Tag[]
  latitude: number
  longitude: number
}
