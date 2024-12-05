import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { ServiceBanner } from '@/types/ServiceBanner'

type Response = APIResponse<ServiceBanner>
export async function getServiceBanner() {
  const res = await apiCall<false, Response>('/info/service-banner', { method: 'GET' })
  return res.data
}
