import { apiCall, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { Choice, FiltersType, MinMax, Toggle } from '@/types/FiltersType'

type Response = APIResponse<FiltersType<Choice | MinMax | Toggle>>

export async function getFilters(objectType: string | null = null) {
  const path: SlashPath = objectType
    ? `/filter/${objectType}`
    : `/${window.location.pathname.replace('/catalog', 'filter')}`

  const res = await apiCall<false, Response>(path, {
    method: 'GET',
  })

  return res.data
}
