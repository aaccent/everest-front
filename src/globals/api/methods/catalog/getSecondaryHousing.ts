import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Category, RawCategory } from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'

type Response = APIResponse<Category<RawCategory, ObjectCard>>

export async function getSecondaryHousing() {
  const res = await apiCall<false, Response>('/catalog/secondary-housing', { method: 'GET' })
  return res.data
}
