import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Office } from '@/types/Geo'

type Response = APIResponse<Office[]>

export async function getOffices(cityId: number) {
  const res = await apiCall<false, Response>(`/contacts/${cityId}`, {
    method: 'GET',
  })

  return res.data
}
