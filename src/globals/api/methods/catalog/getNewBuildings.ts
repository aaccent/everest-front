import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Category, RawCategory } from '@/types/Category'
import { CategoryObject } from '@/types/CategoryObject'

type Response = APIResponse<Category<RawCategory, CategoryObject>>

export async function getNewBuildings() {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'GET',
  })

  return res.data
}
