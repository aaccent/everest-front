import { DetailComplex, RawDetailComplex } from '@/types/Complex'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Request = APIRequest<{
  chainUrl?: string
}>

type Response = APIResponse<RawDetailComplex>

export async function getComplexDetailed(uri: string): Promise<DetailComplex> {
  const res = await apiCall<Request | false, Response>(`/catalog/new-building-complex-detail`, {
    method: 'GET',
    request: { chainUrl: `${uri}` },
  })

  return {
    ...res.data.complex,
    breadcrumbs: res.data.breadcrumbs,
    objects: res.data.objects,
    gallery: res.data.gallery,
  }
}
