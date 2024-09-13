import { ComplexCard } from '@/types/Complex'
import { Category, CategoryRequestWithFilters, FilterRequestParam, SortRequestParam } from '@/types/Category'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Request = APIRequest<
  {
    chainUrl?: string
  } & CategoryRequestWithFilters
>

type Response = APIResponse<Category<ComplexCard>>

export async function getComplexes(
  filter: FilterRequestParam = null,
  sort: SortRequestParam = null,
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
