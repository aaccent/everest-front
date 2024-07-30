import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { SubCategory } from '@/types/Category'
import { Object } from '@/types/Object'

interface SecondaryHouseCategory extends SubCategory {
  typeId: number
}

interface SecondaryHousing {
  breadcrumbs: string
  categories: SecondaryHouseCategory[]
  objects: Object[]
}

type Response = APIResponse<SecondaryHousing>

export async function getSecondaryHousing() {
  const res = await apiCall<false, Response>('/catalog/secondary-housing', { method: 'GET' })
  return res.data
}
