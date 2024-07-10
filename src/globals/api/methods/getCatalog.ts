import detailCatalog from '@/globals/mock-data/detail-catalog.json'
import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Category } from '@/types/Category'

type Response = APIResponse<Category[]>

export async function getCatalog() {
  const res = await apiCall<false, Response>('catalog/all-categories', { method: 'GET' })

  return res.data
}

export async function getDetailCatalog() {
  return detailCatalog
}
