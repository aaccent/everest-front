import {
  Category,
  CategoryRequestWithFilters,
  CategoryRequestWithPagination,
  SubcategoryLikeCategory,
} from '@/types/catalog/Category'
import { CategoryLocation } from '@/types/Map'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

type Props = CategoryRequestWithPagination &
  CategoryRequestWithFilters & {
    subcategory?: string
    location?: CategoryLocation
    rent?: boolean
  }

type Response = APIResponse<Category>
type Request = APIRequest<
  CategoryRequestWithFilters &
    CategoryRequestWithPagination & {
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

  if (!subcategory) return res.data

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
    page: res.data.page,
    perPage: res.data.perPage,
    total: res.data.total,
  }
}
