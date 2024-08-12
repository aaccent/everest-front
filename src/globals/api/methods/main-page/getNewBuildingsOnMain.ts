import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { ComplexCard } from '@/types/Complex'

type Response = APIResponse<ComplexCard[]>

export async function getNewBuildingsOnMain() {
  const res = await apiCall<Request | false, Response>(`/info/get-new-buildings`, { method: 'GET' })
  return res.data
}
