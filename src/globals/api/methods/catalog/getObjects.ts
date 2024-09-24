import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Category, CategoryRequestWithRent, FilterRequestParam, RawCategory, SortRequestParam } from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Request = APIRequest<CategoryRequestWithRent>
type Response = APIResponse<Category<RawCategory, ObjectCard>>

export async function getObjects(
  category: string,
  filter: FilterRequestParam = null,
  sort: SortRequestParam = null,
  rent: boolean = false,
  subcategory: string | null = null,
) {
  const uri = subcategory ? `catalog/${category}/${subcategory}` : `catalog/${category}`
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
