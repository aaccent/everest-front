import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { DocsType } from '@/app/catalog/complexes/[complex]/_components/Documentation/Documentation'

type Response = APIResponse<DocsType[]>

export async function getDocumentation(complexCode: string) {
  const res = await apiCall<false, Response>(`/info/documents-by-complex/${complexCode}`, {
    method: 'GET',
  })

  return res.data
}
