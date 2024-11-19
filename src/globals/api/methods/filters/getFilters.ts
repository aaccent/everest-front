import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { Filters } from '@/types/FiltersType'

type Request = {
  complexId?: number
}

export async function getFilters(objectType: string, complexId?: number) {
  const path: SlashPath = `/filter/${objectType}`
  const res = await apiCall<false | Request, APIResponse<Filters>>(path, {
    method: 'GET',
    request: complexId ? { complexId } : undefined,
  })
  return res.data
}
