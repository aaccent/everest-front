import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Category, RawCategory } from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Response = APIResponse<Category<RawCategory, ObjectCard>>
type Request = APIRequest<{
  filter: string | undefined
  sort: string | undefined
}>

export async function getNewBuildings(filter: string | undefined = undefined, sort: string | undefined = undefined) {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'GET',
    request: {
      filter,
      sort,
    },
  })

  return res.data
}
