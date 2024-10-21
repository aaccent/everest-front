import { Category, SubcategoryLikeCategory } from '@/types/catalog/Category'
import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'
import { GeneralRequestParams } from '@/types/RequestProps'

type Props = GeneralRequestParams & {
  subcategory?: string
  rent?: boolean
}

type Response = APIResponse<Category>
type Request = APIRequest<
  GeneralRequestParams & {
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
