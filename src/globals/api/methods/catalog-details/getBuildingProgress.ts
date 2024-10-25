import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

export interface Period {
  dateFrom: string
  dateTo: string
}

type BuildingProgressProps = Period & {
  complexCode: string
}

export interface BuildingProgressImage {
  date: Date
  image: string
}

type Request = APIRequest<Period>
type Response = APIResponse<BuildingProgressImage[]>

export async function getBuildingProgress({ complexCode, ...options }: BuildingProgressProps) {
  const res = await apiCall<Request, Response>(`/catalog/complexes/${complexCode}/building-progress`, {
    method: 'POST',
    request: { ...options },
  })

  return res.data
}
