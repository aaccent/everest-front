import { cookies } from 'next/headers'
import { COOKIES } from '@/features/utility/cookies'
import { DEFAULT_CITY } from '@/components/GeoPosition'
import { apiCall, APIResponse } from '@/globals/api/apiCall'
import { Office } from '@/types/Geo'

type Response = APIResponse<Office[]>

export async function getOffices() {
  const cityInCookie = cookies()?.get(COOKIES.CITY)?.value
  const cityId = cityInCookie ? JSON.parse(cityInCookie).id : DEFAULT_CITY.id
  const res = await apiCall<false, Response>(`/contacts/${cityId}`, {
    method: 'GET',
  })

  /**
   * Манипуляция нужна, потому что бекенд отдает перепутанные координаты
   */
  const _res: Office[] | undefined =
    res.data[0].latitude > 90
      ? res.data.map((office) => {
          return {
            ...office,
            latitude: Number(office.longitude.toFixed(4)),
            longitude: Number(office.latitude.toFixed(4)),
          }
        })
      : undefined

  return _res || res.data
}
