import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Complex } from '@/types/Complex'

type Response = APIResponse<Complex[]>

export async function getNewBuildingsOnMain() {
  const res = await apiCall<Request | false, Response>(`/info/get-new-buildings`, { method: 'GET' })
  return res.data
}
