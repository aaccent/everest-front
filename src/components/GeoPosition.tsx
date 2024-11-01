import React from 'react'
import GeoPositionNotification from '@/components/GeoPositionNotification'
import { getLocation, getCityByIp } from '@/globals/api'
import { City } from '@/types/Geo'
import { cookies, headers } from 'next/headers'
import { COOKIES } from '@/features/utility/cookies'

const DEFAULT_CITY: City = {
  id: '1',
  name: 'Абакан',
  latitude: 53.72,
  longitude: 91.43,
}

async function GeoPosition() {
  const ip = (headers().get('x-forwarded-for') ?? '').split(',')[0]

  const locations = await getLocation().then((res) => res?.cities || [])
  const cityName = ip ? await getCityByIp(ip) : DEFAULT_CITY.name
  const cityByIp = locations.find((city) => cityName.includes(city.name)) ?? DEFAULT_CITY

  if (cookies().has(COOKIES.CITY)) return null
  return <GeoPositionNotification cityByIp={cityByIp} />
}

export default GeoPosition
