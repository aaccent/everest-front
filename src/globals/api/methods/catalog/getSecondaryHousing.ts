import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import {
  Category,
  CategoryRequestWithFilters,
  FilterRequestParam,
  RawCategory,
  SortRequestParam,
} from '@/types/Category'
import { ObjectCard } from '@/types/ObjectCard'
import { CategoryLocation } from '@/types/Map'

type Props = {
  filter?: FilterRequestParam | null
  sort?: SortRequestParam | null
  location?: CategoryLocation
}

type Response = APIResponse<Category<RawCategory, ObjectCard>>
type Request = APIRequest<
  CategoryRequestWithFilters & {
    location?: CategoryLocation
  }
>

export async function getSecondaryHousing(props: Props = {}) {
  const res = await apiCall<Request, Response>('/catalog/secondary-housing', {
    method: 'POST',
    request: props,
  })
  return res.data
}
