import { Pagination } from '@/types/Pagination'

export interface ComplexHouseObject {
  id: number
  square: string | null
  room: string | null
  floor: number | null
  finishType: string | null
  price: number
  section: string | null
  flatNumber: string | null
  address: string
  layoutUrl: string | null
  seoUrl: string
}

export type ComplexHouse = Pagination & {
  houseNumber: string
  objects: ComplexHouseObject[]
  count: number
}
export type ComplexObjectSortType = 'flat_number' | 'section' | 'price' | 'floor' | 'finish_type' | 'square' | 'room'
