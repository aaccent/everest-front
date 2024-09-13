import { DetailComplex, RawDetailComplex } from '@/types/Complex'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Request = APIRequest<{
  chainUrl?: string
}>

type Response = APIResponse<RawDetailComplex>

export async function getComplexDetailed(uri: string): Promise<DetailComplex> {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings/${uri}`, {
    method: 'POST',
  })

  return {
    ...res.data.complex,
    breadcrumbs: res.data.breadcrumbs,
    objects: res.data.objects,
    gallery: res.data.gallery,
  }
}
