import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { MenuCategory } from '@/types/Menu'

type Response = APIResponse<MenuCategory[]>

export type MenuType = 'sale' | 'rent'

export async function getCatalogMenu(type?: MenuType) {
  const uri: SlashPath = type ? `/category/${type}` : `/category`
  const res = await apiCall<false, Response>(uri, { method: 'GET' })

  return res.data
}
