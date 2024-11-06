import { Filters } from '@/types/FiltersType'

export async function getComplexesFilters(): Promise<Filters> {
  // Temporal fix while backend doesn't fix output format
  // try {
  //   const res = await apiCall<false, APIResponse<Filters>>('/filter/complex/detail', {
  //     method: 'GET',
  //   })
  //
  //   return res.data
  // } catch {
  //   return {
  //     filters: [],
  //     sorts: [],
  //   }
  // }

  return {
    filters: [],
    sorts: [],
  }
}
