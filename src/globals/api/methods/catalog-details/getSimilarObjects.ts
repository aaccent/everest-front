'use server'

import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { DefaultObject } from '@/types/catalog/DefaultObject'

export type SimilarType = 'price' | 'min_area'

type Response = APIResponse<DefaultObject[]>
type Request = APIRequest<{
  type: SimilarType
  objectUrl: string
}>

export async function getSimilarObjects(objectUrl: string, type: SimilarType): Promise<DefaultObject[]> {
  const res = await apiCall<Request, Response>('/info/similar', {
    method: 'GET',
    request: {
      type,
      objectUrl,
    },
  })

  return res.data
}
