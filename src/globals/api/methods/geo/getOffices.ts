import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Office } from '@/types/Geo'

type Response = APIResponse<Office[]>

export async function getOffices(cityId: number) {
  const res = await apiCall<false, Response>(`/contacts/${cityId}`, {
    method: 'GET',
  })

  /**
   * Манипуляция нужна, потому что бекенд отдает перепутанные координаты
   */
  const _res: Office[] =
    res.data[0].latitude > 90
      ? res.data.map((office) => {
          return {
            ...office,
            latitude: office.longitude,
            longitude: office.latitude,
          }
        })
      : res.data

  return _res
}
