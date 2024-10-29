import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Location } from '@/types/Geo'

type Response = APIResponse<Location>
type Request = APIRequest<{
  isOffice: boolean
}>

type Props = {
  countryId?: number
  isOffice?: boolean
}

export async function getLocation({ countryId = 1, isOffice = false }: Props = {}) {
  const res = await apiCall<Request, Response>(`/location/country/${countryId}`, {
    method: 'POST',
    request: {
      isOffice,
    },
  })
  return res.data
}
