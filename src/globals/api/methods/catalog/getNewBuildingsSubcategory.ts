import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import {
  Category,
  CategoryRequestWithFilters,
  FilterRequestParam,
  RawCategory,
  SortRequestParam,
  SubCategory,
} from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Request = APIRequest<
  {
    chainUrl?: string
  } & CategoryRequestWithFilters
>

type Response = APIResponse<Category<RawCategory, ObjectCard>>

export async function getNewBuildingsSubcategory(
  subcategory: string,
  filter: FilterRequestParam = null,
  sort: SortRequestParam = null,
): Promise<SubCategory<ObjectCard>> {
  const res = await apiCall<Request, Response>(`/catalog/new-buildings`, {
    method: 'POST',
    request: { chainUrl: subcategory, filter, sort },
  })

  return {
    ...res.data.categories[0],
    breadcrumbs: res.data.breadcrumbs,
    objects: res.data.objects,
  }
}
