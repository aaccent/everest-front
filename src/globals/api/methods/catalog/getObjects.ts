import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import {
  Category,
  CategoryRequestWithRent,
  FilterRequestParam,
  RawCategory,
  RentParam,
  SortRequestParam,
} from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Request = APIRequest<CategoryRequestWithRent>
type Response = APIResponse<Category<RawCategory, ObjectCard>>

export async function getObjects(
  filter: FilterRequestParam = null,
  sort: SortRequestParam = null,
  rent: RentParam = null,
  category: string,
  subcategory: string | null = null,
) {
  const uri = subcategory ? `catalog/${category}/${subcategory}` : `catalog/${category}`
  //console.log(uri)
  //console.log(filter)
  //console.log(sort)
  const res = await apiCall<Request | false, Response>(`/${uri}`, {
    method: 'POST',
    request: {
      filter,
      sort,
      rent,
    },
  })
  return res.data
}
