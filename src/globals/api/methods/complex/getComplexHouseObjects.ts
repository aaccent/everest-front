import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { ComplexHouse, ComplexHouseObject, ComplexObjectSortType } from '@/types/complex/ComplexHouse'
import { GeneralRequestParams } from '@/types/RequestProps'
import { Pagination } from '@/types/Pagination'

type Response = APIResponse<
  {
    objects: ComplexHouseObject[]
  } & Pagination
>

type Request = APIRequest<
  {
    houseNumber: string
    orderBy?: 'asc' | 'desc'
    orderByWord?: ComplexObjectSortType
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
    objects: res.data.objects,
    page: res.data.page,
    perPage: res.data.perPage,
    total: res.data.total,
    count: res.data.objects.length,
  }
}
