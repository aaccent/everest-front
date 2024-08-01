import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Category, RawCategory, SubCategory } from '@/types/Category'
import { CategoryObject } from '@/types/CategoryObject'

type Request = APIRequest<{
  chainUrl: string
}>
type Response = APIResponse<Category<RawCategory, CategoryObject>>

export async function getSecondaryHousingSubcategory(subcategory: string): Promise<SubCategory<CategoryObject>> {
  const res = await apiCall<Request, Response>('/catalog/secondary-housing', {
    method: 'GET',
    request: { chainUrl: subcategory },
  })

  return {
    ...res.data.categories[0],
    breadcrumbs: res.data.breadcrumbs,
    objects: res.data.objects,
  }
}
