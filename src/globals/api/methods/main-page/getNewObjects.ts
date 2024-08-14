import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { ObjectCard } from '@/types/ObjectCard'

type Response = APIResponse<ObjectCard[]>

export async function getNewObjects() {
  const res = await apiCall<false, Response>('/info/new-objects', { method: 'GET' })
  return res.data
}
