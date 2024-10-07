import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { DefaultObject } from '@/types/catalog/DefaultObject'

type Response = APIResponse<DefaultObject[]>
type Request = APIRequest<{
  type: 'min_area' | 'price'
  objectUrl: string
}>

export async function getSimilarObjects(objectUrl: string, type: 'min_area' | 'price'): Promise<DefaultObject[]> {
  const res = await apiCall<Request, Response>('/info/similar', {
    method: 'GET',
    request: {
      type,
      objectUrl,
    },
  })

  return res.data
}
