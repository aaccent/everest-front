import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Category, RawCategory, SubCategory } from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Request = APIRequest<{
  chainUrl: string
}>
type Response = APIResponse<Category<RawCategory, ObjectCard>>

export async function getSecondaryHousingSubcategory(subcategory: string): Promise<SubCategory<ObjectCard>> {
  const res = await apiCall<Request, Response>('/catalog/secondary-housing', {
    method: 'POST',
    request: { chainUrl: subcategory },
  })

  return {
    ...res.data.categories[0],
    breadcrumbs: res.data.breadcrumbs,
    objects: res.data.objects,
  }
}
