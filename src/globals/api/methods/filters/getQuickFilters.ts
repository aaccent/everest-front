import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { QuickFilters } from '@/types/FiltersType'

type Request = {
  complexId?: number
}

export async function getQuickFilters(objectType: string, complexId?: number) {
  const path: SlashPath = `/filter/${objectType}/main`
  const res = await apiCall<Request | false, APIResponse<QuickFilters>>(path, {
    method: 'GET',
    request: complexId ? { complexId } : undefined,
  })
  return res.data
}
