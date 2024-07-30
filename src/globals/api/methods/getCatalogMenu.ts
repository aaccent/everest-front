import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { MenuCategory } from '@/types/Menu'

type Response = APIResponse<MenuCategory[]>

export async function getCatalogMenu() {
  const res = await apiCall<false, Response>('/category', { method: 'GET' })

  return res.data
}
