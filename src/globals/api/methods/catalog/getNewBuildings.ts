import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import {
  Category,
  CategoryRequestWithFilters,
  FilterRequestParam,
  RawCategory,
  SortRequestParam,
} from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Response = APIResponse<Category<RawCategory, ObjectCard>>
type Request = APIRequest<CategoryRequestWithFilters>

export async function getNewBuildings(filter: FilterRequestParam = null, sort: SortRequestParam = null) {
  const res = await apiCall<Request | false, Response>(`/catalog/new-building`, {
    method: 'POST',
    request: {
      filter,
      sort,
    },
  })

  return res.data
}
