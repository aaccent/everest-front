import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Bonus } from '@/app/catalog/complexes/[complex]/_components/Bonuses'

export async function getBonuses() {
  const res = await apiCall<false, APIResponse<Bonus[]>>('/info/bonuses', { method: 'GET' })
  return res.data
}
