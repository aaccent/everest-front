import { CategoryLocation } from '@/types/Map'

/** Используется как плейсхолдер для возможного рефактора типизации фильтров */
type FilterRequestParam = object[] | null
/** Используется как плейсхолдер для возможного рефактора типизации сортировки */
type SortRequestParam = string | null

interface SortRequest {
  sort?: SortRequestParam
}

interface FilterRequest {
  filter?: FilterRequestParam
}

interface PaginationRequest {
  page?: number
  perPage?: number
}

interface LocationRequest {
  location?: CategoryLocation
}

export type GeneralRequestParams = SortRequest & FilterRequest & PaginationRequest & LocationRequest

export type CategoryDealType = 'sale' | 'rent'
