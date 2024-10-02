import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { ComplexCard } from '@/types/Complex'

type Response = APIResponse<ComplexCard[]>

export async function getNewBuildingsBanner() {
  const res = await apiCall<Request | false, Response>(`/info/new-buildings-banner`, { method: 'GET' })
  return res.data
}
