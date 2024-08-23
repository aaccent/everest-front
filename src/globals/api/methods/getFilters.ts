import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { Filters, QuickFilters } from '@/types/FiltersType'

type Response<F extends QuickFilters | Filters> = APIResponse<F>

export async function getFilters(objectType: string) {
  const path: SlashPath = `/filter/${objectType}`
  const res = await apiCall<false, Response<Filters>>(path, {
    method: 'GET',
  })
  return res.data
}

export async function getQuickFilters(objectType: string) {
  const path: SlashPath = `/filter/${objectType}/main`
  const res = await apiCall<false, Response<QuickFilters>>(path, { method: 'GET' })
  return res.data
}
