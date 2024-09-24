import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Category, CategoryRequestWithRent, FilterRequestParam, RawCategory, SortRequestParam } from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Response = APIResponse<Category<RawCategory, ObjectCard>>
type Request = APIRequest<CategoryRequestWithRent>

export async function getNewBuildings(
  filter: FilterRequestParam = null,
  sort: SortRequestParam = null,
  rent: boolean = false,
) {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'POST',
    request: {
      filter,
      sort,
      rent,
    },
  })

  return res.data
}
