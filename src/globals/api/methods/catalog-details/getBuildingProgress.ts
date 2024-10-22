import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

export interface QuarterRequest {
  dateFrom: Date | string
  dateTo: Date | string
}

type BuildingProgressProps = QuarterRequest & {
  complexCode: string
}

export interface BuildingProgressPart {
  date: Date
  image: string
}

type Request = APIRequest<QuarterRequest>
type Response = APIResponse<BuildingProgressPart[]>

export async function getBuildingProgress({ complexCode, ...options }: BuildingProgressProps) {
  const res = await apiCall<Request, Response>(`/catalog/complexes/${complexCode}/building-progress`, {
    method: 'POST',
    request: { ...options },
  })

  return res.data
}
