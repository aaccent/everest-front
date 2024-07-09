export interface NewBuilding {
  id: string
  name: string
  address: string
  'text-code': string
  'category-code': string
  'min-price': number
  status: number
  tags: string[]
  'flat-types': FlatTypes[]
  photos: string[]
}

interface FlatTypes {
  id: string
  name: string
  'min-square': number
  'min-price': number
}

export interface Default {
  id: string
  name: string
  address: string
  textCode: string
  categoryTextCode: string
  isFavourite?: boolean
  params: string[]
  time: number
  price: number
  photoAmount: number
  photos: string[]
  tags: string[]
}

export type ObjectCardProps =
  | {
      type: 'newBuildings'
      options: NewBuilding
    }
  | {
      type: 'newInCatalog'
      options: Default
    }
