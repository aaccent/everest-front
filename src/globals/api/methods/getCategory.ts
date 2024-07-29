import { apiCall, APIResponse } from '@/globals/api/apiCall'

import { Category } from '@/types/Category'

type Response = APIResponse<Category[]>

export async function getCategory(category: string) {
  const res = await apiCall<Request | false, Response>(`/category/${category}`, { method: 'GET' })
  return res.data
}
