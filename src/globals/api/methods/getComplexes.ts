import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Complex } from '@/types/Complex'
import { Category } from '@/types/Category'

type Request = APIRequest<{
  chainUrl?: 'complexes' | 'apartments' | 'penthouses'
}>

type Response = APIResponse<Category<Complex>>

export async function getComplexes(): Promise<Category<false, Complex>> {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'GET',
    request: { chainUrl: 'complexes' },
  })

  return {
    ...res.data,
    categories: [],
    objects: res.data.categories,
  }
}
