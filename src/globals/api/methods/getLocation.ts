import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Location } from '@/types/Geo'

type Response = APIResponse<Location>

export async function getLocation(countryId: number = 1) {
  const res = await apiCall<false, Response>(`/location/country/${countryId}`, {
    method: 'GET',
  })
  return res.data
}
