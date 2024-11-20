import { Filters } from '@/types/FiltersType'
import { apiCall, APIResponse } from '@/globals/api/apiCall'

export async function getComplexesFilters(): Promise<Filters> {
  try {
    const res = await apiCall<false, APIResponse<Filters>>('/filter/complex', {
      method: 'GET',
    })

    return res.data
  } catch {
    return {
      filters: [],
      sorts: [],
    }
  }
}
