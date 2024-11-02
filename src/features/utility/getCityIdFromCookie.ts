import { cookies } from 'next/headers'
import { COOKIES } from '@/features/utility/cookies'
import { DEFAULT_CITY } from '@/components/GeoPosition'
import { syncTryJSONParse } from '@/globals/fetch'

export function getCityIdFromCookie(): number {
  const cityInCookie = cookies()?.get(COOKIES.CITY)?.value
  const jsonCityInCookie = syncTryJSONParse<{ name: string; id: string }>(cityInCookie)

  if (!jsonCityInCookie) return Number(DEFAULT_CITY.id)
  return Number(jsonCityInCookie.id)
}
