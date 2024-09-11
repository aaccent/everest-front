import { ComplexCard } from '@/types/Complex'
import { Category } from '@/types/Category'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Request = APIRequest<{
  chainUrl?: string
  filter: object[] | null
  sort: string | null
}>

type Response = APIResponse<Category<ComplexCard>>

export async function getComplexes(
  filter: object[] | null = null,
  sort: string | null = null,
): Promise<Category<false, ComplexCard>> {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'POST',
    request: { chainUrl: 'complexes', sort, filter },
  })

  return {
    ...res.data,
    categories: [],
    objects: res.data.categories,
  }
}
