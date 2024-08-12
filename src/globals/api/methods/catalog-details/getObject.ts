import { RawDetailSecondaryObject, DetailSecondaryObject } from '@/types/DetailSecondaryObject'
import { apiCall, APIRequest, APIResponse, SlashPath } from '@/globals/api/apiCall'

interface Props {
  category: string
  subcategory?: string
  object: string
}

type Request = APIRequest<{
  chainUrl?: string
}>

type Response = APIResponse<RawDetailSecondaryObject>

export async function getObject(props: Props): Promise<DetailSecondaryObject> {
  const path: SlashPath = `/catalog/${props.category}/${props.object}`
  const res = await apiCall<Request, Response>(path, {
    method: 'GET',
    request: {
      chainUrl: props.subcategory,
    },
  })

  return {
    ...res.data.object,
    breadcrumbs: res.data.breadcrumbs,
    characteristics: res.data.characteristics,
    gallery: res.data.gallery,
  }
}
