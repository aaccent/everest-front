import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Period } from '@/globals/api'

type Response = APIResponse<Period>

export async function getYears(complexCode: string) {
  const res = await apiCall<false, Response>(`/catalog/complexes/${complexCode}/building-progress/date`, {
    method: 'GET',
  })
  return res.data
}
