import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { ComplexObject } from '@/types/catalog/Complex'

type Response = APIResponse<ComplexObject[]>

export async function getNewBuildingsBanner() {
  const res = await apiCall<Request | false, Response>(`/info/new-buildings-banner`, { method: 'GET' })
  return res.data
}
