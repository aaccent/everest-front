import { cookies } from 'next/headers'
import { COOKIES } from '@/features/utility/cookies'
import { syncTryJSONParse } from '@/globals/fetch'
import { DEFAULT_CITY } from '@/globals/CityContext'

export async function getCityIdFromCookie(): Promise<number> {
  const _cookies = await cookies()
  const cityInCookie = _cookies.get(COOKIES.CITY)?.value
  const jsonCityInCookie = syncTryJSONParse<{ name: string; id: string }>(cityInCookie)

  if (!jsonCityInCookie) return Number(DEFAULT_CITY.id)
  return Number(jsonCityInCookie.id)
}
