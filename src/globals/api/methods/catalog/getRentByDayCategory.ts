import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { GeneralRequestParams } from '@/types/RequestProps'
import { DefaultObject } from '@/types/catalog/DefaultObject'

type Props = GeneralRequestParams

type Response = APIResponse<DefaultObject[]>
type Request = APIRequest<GeneralRequestParams>

export async function getRentByDayCategory(props: Props) {
  const res = await apiCall<Request, Response>('/catalog/rent_one_day', {
    request: props,
    method: 'POST',
  })

  return {
    objects: res.data,
  }
}
