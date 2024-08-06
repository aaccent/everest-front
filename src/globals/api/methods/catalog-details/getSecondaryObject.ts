import { RawSecondaryDetailObject, SecondaryDetailObject } from '@/types/SecondaryDetailObject'
import { apiCall, APIRequest, APIResponse, SlashPath } from '@/globals/api/apiCall'

interface Props {
  category: string
  subcategory?: string
  object: string
}

type Request = APIRequest<{
  chainUrl?: string
}>

type Response = APIResponse<RawSecondaryDetailObject>

export async function getSecondaryObject(props: Props): Promise<SecondaryDetailObject> {
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
