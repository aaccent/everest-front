import { Tag } from '@/types/Tag'
import { DateString } from '@/types/Date'

export interface DefaultObject {
  id: number
  name: string
  complexName: string | null
  address: string | null
  seoUrl: string
  minArea: number
  typeObject: string
  description: string | null
  isReserved: boolean
  price: number
  priceDiscount: number | null
  userId: number | null
  gallery: {
    images: string[]
    count: number
  }
  categoryObject: string | null
  completionDate: DateString
  publicationTime: DateString
  tags: Tag[] | null
  characteristics: {
    id: number
    value: string | number
  }[]
  latitude: number
  longitude: number
}
