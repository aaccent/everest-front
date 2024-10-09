import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { QuickFilters } from '@/types/FiltersType'

export async function getComplexQuickFilters() {
  const res = await apiCall<false, APIResponse<QuickFilters>>('/filter/complex', {
    method: 'GET',
  })

  return res.data
}
