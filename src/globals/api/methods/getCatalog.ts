import { Category } from '@/types/Category'
import { apiCall, APIResponse, isNeedMockData } from '@/globals/api/apiCall'
import CatalogMockData from '@/globals/mock-data/catalog.json'

type Response = APIResponse<Category[]>

export async function getCatalog(): Promise<Category[]> {
  if (isNeedMockData) return CatalogMockData.data

  const res = await apiCall<false, Response>('catalog/all-categories', { method: 'GET' })

  return res.data
}
