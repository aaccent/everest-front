import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { DefaultObject } from '@/types/catalog/DefaultObject'

type Response = APIResponse<DefaultObject[]>

export async function getNewObjects() {
  const res = await apiCall<false, Response>('/info/new-objects', { method: 'GET' })
  return res.data
}
