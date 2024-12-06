import { Category, SubcategoryLikeCategory } from '@/types/catalog/Category'
import { apiCall, APIRequest, APIResponse, SlashPath } from '@/globals/api/apiCall'
import { CategoryDealType, GeneralRequestParams } from '@/types/RequestProps'

type Props = GeneralRequestParams & {
  subcategory?: string
  dealType?: CategoryDealType
  isNew?: boolean
}

type Response = APIResponse<Category>
type Request = APIRequest<
  GeneralRequestParams & {
    chainUrl?: string
    dealType?: CategoryDealType
  }
>

export async function getCategory(
  category: string,
  { subcategory, dealType, isNew, ...options }: Props = {},
): Promise<Category | SubcategoryLikeCategory> {
  let path: SlashPath = `/catalog/${category}`

  const params: { [index: string]: string } = {}

  if (dealType) {
    params.dealType = dealType
  }

  if (isNew) {
    params['new-objects'] = 'true'
  }

  path += `?${new URLSearchParams(params).toString()}`

  const res = await apiCall<Request, Response>(path as SlashPath, {
    method: 'POST',
    request: {
      chainUrl: subcategory,
      ...options,
    },
  })

  if (!subcategory) return res.data

  return {
    ...res.data.categories[0],
    // Перезаписываем потому что в res.data.categories[0].count общее количество объектов,
    // а в res.data.count которое ожидаем увидеть
    count: res.data.count,
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
