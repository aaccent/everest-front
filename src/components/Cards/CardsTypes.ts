interface FlatTypes {
  id: string
  name: string
  'min-square': number
  'min-price': number
}

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
