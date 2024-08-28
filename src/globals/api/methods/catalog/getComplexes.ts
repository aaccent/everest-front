import { ComplexCard } from '@/types/Complex'
import { Category } from '@/types/Category'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Request = APIRequest<{
  chainUrl?: string
  filter: string | undefined
  sort: string | undefined
}>

type Response = APIResponse<Category<ComplexCard>>

export async function getComplexes(
  filter: string | undefined = undefined,
  sort: string | undefined = undefined,
): Promise<Category<false, ComplexCard>> {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'GET',
    request: { chainUrl: 'complexes', sort, filter },
  })

  return {
    ...res.data,
    categories: [],
    objects: res.data.categories,
  }
}
