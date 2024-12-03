import { DetailComplex, DetailComplexFromAPI } from '@/types/catalog/Complex'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Request = APIRequest<{
  chainUrl?: string
}>

type Response = APIResponse<DetailComplexFromAPI>

export async function getComplexDetailed(uri: string): Promise<DetailComplex> {
  const res = await apiCall<Request | false, Response>(`/catalog/complexes/${uri}`, {
    method: 'POST',
  })

  return {
    ...res.data.complex,
    breadcrumbs: res.data.breadcrumbs,
    gallery: res.data.gallery,
    objectCount: res.data.objectCount,
    houseNumbers: res.data.houseNumbers,
  }
}
