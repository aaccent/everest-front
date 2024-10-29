import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { ComplexHouse, ComplexHouseObject } from '@/types/complex/ComplexHouse'
import { GeneralRequestParams } from '@/types/RequestProps'
import { Pagination } from '@/types/Pagination'

type Response = APIResponse<
  {
    data: ComplexHouseObject[]
  } & Pagination
>

type Request = APIRequest<
  {
    houseNumber: string
    orderBy?: 'asc' | 'desc'
    orderByWord?: 'flat_number' | string
  } & GeneralRequestParams
>

type Props = Omit<Request, 'houseNumber'>

export async function getComplexHouseObjects(
  complexCode: string,
  houseNumber: string,
  props: Props = {},
): Promise<ComplexHouse> {
  const res = await apiCall<Request, Response>(`/catalog/complexes/${complexCode}/objects`, {
    method: 'POST',
    request: {
      houseNumber,
      ...props,
    },
  })

  return {
    houseNumber,
    list: res.data.data,
    page: res.data.page,
    perPage: res.data.perPage,
    total: res.data.total,
  }
}
