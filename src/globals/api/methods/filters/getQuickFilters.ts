import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { QuickFilters } from '@/types/FiltersType'
import { EMPTY_FILTERS } from '@/globals/filters'

type Request = {
  complexSeo?: string
}

export async function getQuickFilters(objectType: string, complexSeo?: string) {
  try {
    const path: SlashPath = `/filter/${objectType}/main`
    const res = await apiCall<Request | false, APIResponse<QuickFilters>>(path, {
      method: 'GET',
      request: complexSeo ? { complexSeo } : undefined,
    })
    return res.data
  } catch {
    return EMPTY_FILTERS
  }
}
