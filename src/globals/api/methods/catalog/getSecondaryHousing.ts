import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Category, RawCategory } from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Response = APIResponse<Category<RawCategory, ObjectCard>>
type Request = APIRequest<{
  filter: object[] | null
  sort: string | null
}>

export async function getSecondaryHousing(filter: object[] | null = null, sort: string | null = null) {
  const res = await apiCall<Request, Response>('/catalog/secondary-housing', {
    method: 'POST',
    request: {
      filter,
      sort,
    },
  })
  return res.data
}
