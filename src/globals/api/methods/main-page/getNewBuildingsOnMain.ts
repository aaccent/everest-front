import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { ComplexObject } from '@/types/catalog/Complex'

type Response = APIResponse<ComplexObject[]>

export async function getNewBuildingsOnMain() {
  const res = await apiCall<Request | false, Response>(`/info/get-new-buildings`, { method: 'GET' })
  return res.data
}
