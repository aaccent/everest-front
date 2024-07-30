export interface Tag {
  id: number
  name: string
}

export interface CategoryObject {
  id: number
  title: string
  typeObject: string
  description: string
  price: string
  priceDiscount: string | null
  userId: number | null
  mainImagePath: string | null
  mainImageUrl?: string | null
  publicationTime: string
  address: string | null
  seoUrl: string
  tags: Tag[]
}
