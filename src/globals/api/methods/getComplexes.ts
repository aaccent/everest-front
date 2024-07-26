import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Complex } from '@/types/Complex'

type Request = APIRequest<{
  chainUrl?: 'complexes' | 'apartments' | 'penthouses'
}>

type Response = APIResponse<{
  breadcrumbs: string[]
  categories: Complex[]
}>

export async function getComplexes() {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'POST',
    request: { chainUrl: 'complexes' },
  })
  return res.data
}
