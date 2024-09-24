import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import {
  Category,
  CategoryRequestWithFilters,
  FilterRequestParam,
  RawCategory,
  SortRequestParam,
} from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Request = APIRequest<CategoryRequestWithFilters>
type Response = APIResponse<Category<RawCategory, ObjectCard>>

export async function getObjects(
  filter: FilterRequestParam = null,
  sort: SortRequestParam = null,
  category: string,
  subgategory: string | null = null,
) {
  const uri = subgategory ? `catalog/${category}/${subgategory}` : `catalog/${category}`
  //console.log(uri)
  //console.log(filter)
  //console.log(sort)
  const res = await apiCall<Request | false, Response>(`/${uri}`, {
    method: 'POST',
    request: {
      filter,
      sort,
    },
  })
  return res.data
}
