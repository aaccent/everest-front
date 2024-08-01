import { Complex } from '@/types/Complex'
import { SubCategory } from '@/types/Category'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { CategoryObject } from '@/types/CategoryObject'

type Request = APIRequest<{
  chainUrl?: string
}>

type ComplexDetailed = {
  breadcrumbs: BreadcrumbItem[]
  complex: Complex
  objects: CategoryObject[]
}

type Response = APIResponse<SubCategory<ComplexDetailed>>

export async function getComplexDetailed(uri: string): Promise<SubCategory<ComplexDetailed>> {
  const res = await apiCall<Request | false, Response>(`/catalog/new-building-complex-detail`, {
    method: 'GET',
    request: { chainUrl: `${uri}` },
  })

  return res.data
}
