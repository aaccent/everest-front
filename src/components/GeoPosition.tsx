import React from 'react'
import GeoPositionNotification from '@/components/GeoPositionNotification'
import { getCityByIp } from '@/globals/api/geo/getCityByIp'
import { getLocation } from '@/globals/api'
import { City } from '@/types/Geo'
import { cookies } from 'next/headers'
import { COOKIES } from '@/features/utility/cookies'

const DEFAULT_CITY: City = {
  id: '1',
  name: 'Абакан',
  latitude: 53.72,
  longitude: 91.43,
}

async function GeoPosition() {
  const locations = await getLocation().then((res) => res.cities)
  const cityName = await getCityByIp()
  const cityByIp = locations.find((city) => cityName.includes(city.name)) ?? DEFAULT_CITY

  if (cookies().has(COOKIES.CITY)) return null
  return <GeoPositionNotification cityByIp={cityByIp} />
}

export default GeoPosition
