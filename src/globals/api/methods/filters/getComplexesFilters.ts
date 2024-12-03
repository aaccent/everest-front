import { Filters } from '@/types/FiltersType'
import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { EMPTY_FILTERS } from '@/globals/filters'

export async function getComplexesFilters(): Promise<Filters> {
  try {
    const res = await apiCall<false, APIResponse<Filters>>('/filter/complex', {
      method: 'GET',
    })

    return res.data
  } catch {
    return EMPTY_FILTERS
  }
}
