import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { Filters } from '@/types/FiltersType'

type Request = {
  complexSeo?: string
}

export async function getFilters(objectType: string, complexSeo?: string) {
  const path: SlashPath = `/filter/${objectType}`
  const res = await apiCall<false | Request, APIResponse<Filters>>(path, {
    method: 'GET',
    request: complexSeo ? { complexSeo } : undefined,
  })
  return res.data
}
