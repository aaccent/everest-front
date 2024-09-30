import {
  Category,
  CategoryRequestWithFilters,
  FilterRequestParam,
  RawCategory,
  SortRequestParam,
  SubCategory,
} from '@/types/Category'
import { CategoryLocation } from '@/types/Map'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { ObjectCard } from '@/types/ObjectCard'

interface Props {
  category: string
  subcategory?: string
  filter?: FilterRequestParam | null
  sort?: SortRequestParam | null
  location?: CategoryLocation
}

type Response = APIResponse<Category<RawCategory, ObjectCard>>
type Request = APIRequest<
  CategoryRequestWithFilters & {
    location?: CategoryLocation
    chainUrl?: string
  }
>

export async function getCategory({
  category,
  subcategory,
  ...options
}: Props): Promise<Category<RawCategory, ObjectCard> | SubCategory<ObjectCard>> {
  const res = await apiCall<Request, Response>(`/catalog/${category}`, {
    method: 'POST',
    request: {
      chainUrl: subcategory,
      ...options,
    },
  })

  if (!category) return res.data

  return {
    ...res.data.categories[0],
    breadcrumbs: res.data.breadcrumbs,
    objects: res.data.objects,
  }
}
