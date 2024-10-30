import { cookies } from 'next/headers'
import { COOKIES } from '@/features/utility/cookies'
import { DEFAULT_CITY } from '@/components/GeoPosition'

export function getCityIdFromCookie(): number {
  const cityInCookie = cookies()?.get(COOKIES.CITY)?.value
  return cityInCookie ? JSON.parse(cityInCookie).id : DEFAULT_CITY.id
}
