import {
  Category,
  CategoryRequestWithFilters,
  FilterRequestParam,
  SortRequestParam,
  SubcategoryLikeCategory,
} from '@/types/catalog/Category'
import { CategoryLocation } from '@/types/Map'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

interface Props {
  subcategory?: string
  filter?: FilterRequestParam | null
  sort?: SortRequestParam | null
  location?: CategoryLocation
  rent?: boolean
}

type Response = APIResponse<Category>
type Request = APIRequest<
  CategoryRequestWithFilters & {
    location?: CategoryLocation
    chainUrl?: string
    rent?: boolean
  }
>

export async function getCategory(
  category: string,
  { subcategory, ...options }: Props = {},
): Promise<Category | SubcategoryLikeCategory> {
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
    parent: {
      id: res.data.id,
      name: res.data.name,
      seoUrl: res.data.seoUrl,
      count: res.data.count,
      breadcrumbs: res.data.breadcrumbs,
    },
    breadcrumbs: res.data.breadcrumbs,
    objects: res.data.objects,
  }
}
