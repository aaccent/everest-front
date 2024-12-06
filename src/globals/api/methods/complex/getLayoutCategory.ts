import { GeneralRequestParams } from '@/types/RequestProps'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { Category } from '@/types/catalog/Category'

type Props = GeneralRequestParams

type Response = APIResponse<Category>
type Request = APIRequest<
  GeneralRequestParams & {
    complexSeo: string
    typeOfLayoutId: number
  }
>

export async function getLayoutCategory(complexSeo: string, layoutId: number, props?: Props) {
  const res = await apiCall<Request, Response>('/catalog/new-building', {
    method: 'POST',
    request: {
      ...props,
      complexSeo,
      typeOfLayoutId: layoutId,
    },
  })

  return res.data
}
