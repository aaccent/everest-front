import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { GeneralRequestParams } from '@/types/RequestProps'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import { Pagination } from '@/types/Pagination'

type Props = GeneralRequestParams

type Response = APIResponse<{ objects: DefaultObject[] } & Pagination>
type Request = APIRequest<GeneralRequestParams>

export async function getRentByDayCategory(props: Props) {
  const res = await apiCall<Request, Response>('/catalog/rent-one-day', {
    request: props,
    method: 'POST',
  })

  return {
    ...res.data,
    count: res.data.objects.length,
  }
}
