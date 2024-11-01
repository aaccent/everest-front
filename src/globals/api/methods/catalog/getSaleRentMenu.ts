import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { SaleRentCategory } from '@/types/Menu'

type Response = APIResponse<SaleRentCategory[]>

export type MenuType = 'sale' | 'rent'

export async function getSaleRentMenu(type: MenuType) {
  const res = await apiCall<false, Response>(`/category/${type}`, { method: 'GET' })

  return res.data
}
