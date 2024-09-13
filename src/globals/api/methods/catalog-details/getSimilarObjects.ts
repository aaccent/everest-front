import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { ObjectCard } from '@/types/ObjectCard'

type Response = APIResponse<ObjectCard[]>
type Request = APIRequest<{
  type: 'min_area' | 'price'
  objectUrl: string
}>

export async function getSimilarObjects(objectUrl: string, type: 'min_area' | 'price'): Promise<ObjectCard[]> {
  const res = await apiCall<Request, Response>('/info/similar', {
    method: 'GET',
    request: {
      type,
      objectUrl,
    },
  })

  return res.data
}
