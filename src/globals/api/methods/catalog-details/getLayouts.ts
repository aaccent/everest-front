import { CategoryRequestWithFilters, CategoryRequestWithPagination } from '@/types/catalog/Category'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { LayoutGroup } from '@/types/catalog/LayoutGroup'

type Request = APIRequest<CategoryRequestWithPagination & CategoryRequestWithFilters>
type Response = APIResponse<LayoutGroup[]>

export async function getLayouts(complexCode: string, props: Request = {}) {
  const res = await apiCall<Request, Response>(`/catalog/complexes/${complexCode}/layouts`, {
    method: 'POST',
    request: props,
  })

  return res.data
}
