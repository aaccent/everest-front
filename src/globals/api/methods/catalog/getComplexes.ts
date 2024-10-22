import { ComplexesCategory, ComplexesCategoryFromAPI } from '@/types/catalog/Complex'
import { CategoryRequestWithFilters, FilterRequestParam, SortRequestParam } from '@/types/catalog/Category'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Request = APIRequest<
  {
    chainUrl?: string
  } & CategoryRequestWithFilters
>

type Response = APIResponse<ComplexesCategoryFromAPI>

export async function getComplexes(
  filter: FilterRequestParam = null,
  sort: SortRequestParam = null,
): Promise<ComplexesCategory> {
  const res = await apiCall<Request | false, Response>(`/catalog/complexes`, {
    method: 'POST',
    request: { chainUrl: 'complexes', sort, filter },
  })

  return {
    ...res.data,
    categories: [],
    objects: res.data.categories,
    page: res.data.page | 1,
    perPage: res.data.perPage | 9,
    total: res.data.total | res.data.categories.length,
    count: res.data.count,
  }
}
