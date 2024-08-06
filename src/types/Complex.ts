import { Tag } from '@/types/Tag'

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
