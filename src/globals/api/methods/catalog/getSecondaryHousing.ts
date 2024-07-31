import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Category, RawCategory } from '@/types/Category'
import { CategoryObject } from '@/types/CategoryObject'

type Response = APIResponse<Category<RawCategory, CategoryObject>>

export async function getSecondaryHousing() {
  const res = await apiCall<false, Response>('/catalog/secondary-housing', { method: 'GET' })
  return res.data
}
