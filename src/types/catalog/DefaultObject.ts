import { Tag } from '@/types/Tag'
import { DateString } from '@/types/Date'
import { ObjectCardCharacteristic } from '@/types/Characteristic'

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
  characteristics: ObjectCardCharacteristic[]
  latitude: number
  longitude: number
}
