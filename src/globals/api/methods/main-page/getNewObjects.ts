import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { CategoryObject } from '@/types/CategoryObject'

type Response = APIResponse<CategoryObject[]>

export async function getNewObjects() {
  const res = await apiCall<false, Response>('/info/new-objects', { method: 'GET' })
  return res.data
}
