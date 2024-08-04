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
  tags?: string[]
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
  details?: []
}
