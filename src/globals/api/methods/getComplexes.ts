import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Complex } from '@/types/Complex'

type Request = APIRequest<{
  chainUrl?: 'complexes' | 'apartments' | 'penthouses'
}>

export type breadcrumb = {
  name: string
  seo: string
}

type Response = APIResponse<{
  breadcrumbs: breadcrumb[]
  categories: Complex[]
}>

export async function getComplexes() {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'GET',
    request: { chainUrl: 'complexes' },
  })
  return res.data
}
