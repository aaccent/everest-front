import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { ExclusiveOffersType } from '@/app/catalog/complexes/[complex]/_components/ExclusiveOffers'

export async function getExclusiveOffers() {
  const res = await apiCall<false, APIResponse<ExclusiveOffersType>>('/info/exclusive-offers', { method: 'GET' })
  return res.data
}
