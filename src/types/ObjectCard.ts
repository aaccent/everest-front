import { Tag } from '@/types/Tag'
import { Characteristic } from '@/types/Characteristic'

export interface ObjectCard {
  id: number
  name: string
  complexName?: string
  address: string | null
  seoUrl: string
  minArea: number
  typeObject: string
  description: string
  isReserved?: boolean
  price: number
  priceDiscount: number
  userId: number | null
  gallery: {
    images: string[]
    count: number
  }
  completionDate: string
  publicationTime: string
  tags: Tag[]
  characteristics: Characteristic[]
}
