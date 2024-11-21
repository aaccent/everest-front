import React from 'react'
import GeoPositionNotification from '@/components/GeoPositionNotification'
import { getLocation, getCityByIp } from '@/globals/api'
import { cookies, headers } from 'next/headers'
import { COOKIES } from '@/features/utility/cookies'
import { DEFAULT_CITY } from '@/globals/CityContext'

export async function getCityByIpFromLocation() {
  const _headers = await headers()
  const ip = (_headers.get('x-forwarded-for') ?? '').split(',')[0]
  const locations = await getLocation().then((res) => res?.cities || [])
  const cityName = ip ? await getCityByIp(ip) : DEFAULT_CITY.name
  return locations.find((city) => cityName.includes(city.name)) ?? DEFAULT_CITY
}

async function GeoPosition() {
  const cityByIp = await getCityByIpFromLocation()

  if ((await cookies()).has(COOKIES.CITY)) return null
  return <GeoPositionNotification cityByIp={cityByIp} />
}

export default GeoPosition
