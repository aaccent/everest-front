import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Filters } from '@/types/FiltersType'

export async function getComplexFilters() {
  const res = await apiCall<false, APIResponse<Filters>>('/filter/complex/detail', {
    method: 'GET',
  })

  return res.data
}
