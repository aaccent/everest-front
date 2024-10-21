import { ComplexesCategory, ComplexesCategoryFromAPI } from '@/types/catalog/Complex'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { GeneralRequestParams } from '@/types/RequestProps'

type Request = APIRequest<GeneralRequestParams & { chainUrl?: string }>

type Props = GeneralRequestParams

type Response = APIResponse<ComplexesCategoryFromAPI>

export async function getComplexes({ ...options }: Props = {}): Promise<ComplexesCategory> {
  const res = await apiCall<Request | false, Response>(`/catalog/complexes`, {
    method: 'POST',
    request: { chainUrl: 'complexes', ...options },
  })

  return {
    ...res.data,
    categories: [],
    objects: res.data.categories,
    page: res.data.page,
    perPage: res.data.perPage,
    total: res.data.total,
    count: res.data.count,
  }
}
