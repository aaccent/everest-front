import { Category } from '@/types/Category'
import { apiCall, APIResponse } from '@/globals/api/apiCall'

type Response = APIResponse<Category[]>

export async function getCatalog(): Promise<Category[]> {
  const res = await apiCall<false, Response>('/category', { method: 'GET' })

  return res.data
}
