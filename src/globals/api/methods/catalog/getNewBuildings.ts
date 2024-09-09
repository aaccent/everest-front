import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Category, RawCategory } from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Response = APIResponse<Category<RawCategory, ObjectCard>>
type Request = APIRequest<{
  filter: string | undefined | null
  sort: string | undefined | null
}>

export async function getNewBuildings(
  filter: string | undefined | null = undefined,
  sort: string | undefined | null = undefined,
) {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'POST',
    request: {
      filter,
      sort,
    },
  })

  return res.data
}
