import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { Filters } from '@/types/FiltersType'
import { EMPTY_FILTERS } from '@/globals/filters'

type Request = {
  complexSeo?: string
}

export async function getFilters(objectType: string, complexSeo?: string) {
  try {
    const path: SlashPath = `/filter/${objectType}`
    const res = await apiCall<false | Request, APIResponse<Filters>>(path, {
      method: 'GET',
      request: complexSeo ? { complexSeo } : undefined,
    })
    return res.data
  } catch {
    return EMPTY_FILTERS
  }
}
