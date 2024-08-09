import { ComplexDetailed } from '@/types/Complex'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Request = APIRequest<{
  chainUrl?: string
}>

type Response = APIResponse<ComplexDetailed>

export async function getComplexDetailed(uri: string): Promise<ComplexDetailed> {
  const res = await apiCall<Request | false, Response>(`/catalog/new-building-complex-detail`, {
    method: 'GET',
    request: { chainUrl: `${uri}` },
  })
  return res.data
}
