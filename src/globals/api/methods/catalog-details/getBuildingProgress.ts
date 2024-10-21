import { apiCall, APIRequest, APIResponse } from '@/globals/api/apiCall'

interface QuarterRequest {
  dateFrom: Date
  dateTo: Date
}

type BuildingProgressProps = QuarterRequest & {
  complexCode: string
}

interface BuildingProgressPart {
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
