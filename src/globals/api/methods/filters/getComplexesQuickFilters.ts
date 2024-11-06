import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { QuickFilters } from '@/types/FiltersType'

export async function getComplexesQuickFilters(): Promise<QuickFilters> {
  try {
    const res = await apiCall<false, APIResponse<QuickFilters>>('/filter/complex', {
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
