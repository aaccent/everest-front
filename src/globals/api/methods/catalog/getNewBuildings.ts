import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Category, RawCategory } from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Response = APIResponse<Category<RawCategory, ObjectCard>>

export async function getNewBuildings() {
  const res = await apiCall<Request | false, Response>(`/catalog/new-buildings`, {
    method: 'GET',
  })

  return res.data
}
