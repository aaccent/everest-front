import React from 'react'
import GeoPositionNotification from '@/components/GeoPositionNotification'
import { getCityByIp } from '@/features/utility/getCityByIp'
import { getLocation } from '@/globals/api/methods/getLocation'
import { City } from '@/types/Geo'
import { cookies } from 'next/headers'

const DEFAULT_CITY: City = {
  id: '1',
  name: 'Абакан',
  latitude: 53.72,
  longitude: 91.43,
}

async function GeoPosition() {
  const locations = await getLocation().then((res) => res.cities)
  const cityName = await getCityByIp()
  const cityByIp = locations.find((c) => cityName.includes(c.name)) ?? DEFAULT_CITY

  function showNotification() {
    if (!cookies().has('city')) {
      return <GeoPositionNotification cityByIp={cityByIp} />
    } else {
      return null
    }
  }

  return showNotification()
}

export default GeoPosition
