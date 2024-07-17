export interface Object {
  id: number
  title: string
  typeObject: string
  description: string
  price: number
  priceDiscount: number | null
  userId: number | null
  mainImagePath: string | null
}
