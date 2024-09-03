import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { Filters, QuickFilters } from '@/types/FiltersType'

export async function getFilters(objectType: string) {
  const path: SlashPath = `/filter/${objectType}`
  const res = await apiCall<false, APIResponse<Filters>>(path, {
    method: 'GET',
  })
  return res.data
}

export async function getQuickFilters(objectType: string) {
  const path: SlashPath = `/filter/${objectType}/main`
  const res = await apiCall<false, APIResponse<QuickFilters>>(path, { method: 'GET' })
  return res.data
}
