import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { FilterType, FilterView, QuickFilters } from '@/types/FiltersType'
import { EMPTY_FILTERS } from '@/globals/filters'

type Response = APIResponse<FilterType<FilterView>[]>

export async function getComplexesQuickFilters(): Promise<QuickFilters> {
  try {
    const res = await apiCall<false, Response>('/filter/complex/main', {
      method: 'GET',
    })

    return {
      filters: res.data,
      sorts: [],
    }
  } catch {
    return EMPTY_FILTERS
  }
}
