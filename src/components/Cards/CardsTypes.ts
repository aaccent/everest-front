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
}

interface FlatTypes {
  id: string
  name: string
  minArea: number
  minPrice: number
}
