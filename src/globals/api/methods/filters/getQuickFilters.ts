import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { QuickFilters } from '@/types/FiltersType'

export async function getQuickFilters(objectType: string) {
  const path: SlashPath = `/filter/${objectType}/main`
  const res = await apiCall<false, APIResponse<QuickFilters>>(path, { method: 'GET' })
  return res.data
}
