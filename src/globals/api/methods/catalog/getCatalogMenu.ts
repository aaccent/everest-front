import { apiCall, APIResponse, URI } from '@/globals/api/apiCall'
import { MenuCategory } from '@/types/Menu'

type Response = APIResponse<MenuCategory[]>

export type MenuType = 'sale' | 'rent'

export async function getCatalogMenu(type?: MenuType) {
  const uri: URI = type ? `/category/${type}` : `/category`
  const res = await apiCall<false, Response>(uri, { method: 'GET' })

  return res.data
}