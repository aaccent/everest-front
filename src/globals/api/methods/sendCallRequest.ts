import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Request = APIRequest<{
  name: string
  phone: string
  text: string
}>

export async function sendCallRequest(request: Request): Promise<boolean> {
  const res = await apiCall<Request, APIResponse<[]>>('/feedback', { request })
  return res.message === 'Заявка отправлена'
}
