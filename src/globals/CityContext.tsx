'use client'
import { City } from '@/types/Geo'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { getLocation } from '@/globals/api'
import { COOKIES, cookies, setCookie } from '@/features/utility/cookies'

export const DEFAULT_CITY: City = {
  id: '1',
  name: 'Абакан',
  latitude: 53.72,
  longitude: 91.43,
}

interface CityContextObject {
  currentCity: City
  setCurrentCity: (value: City) => void
}

export const CityContext = createContext({} as CityContextObject)

export function CityContextProvider({ children }: PropsWithChildren) {
  const [currentCity, setCurrentCity] = useState<City>(DEFAULT_CITY)

  useEffect(() => {
    const cookie = cookies()?.get(COOKIES.CITY)

    if (!cookie) return

    getLocation().then((res) => {
      const city = res?.cities.find((c) => cookie.value.includes(c.name))
      setCurrentCity(city || DEFAULT_CITY)
    })
  }, [])

  function _setCurrentCity(city: City) {
    setCookie(COOKIES.CITY, JSON.stringify({ name: city.name, id: city.id }))
    setCurrentCity(city)
  }

  return (
    <CityContext.Provider
      value={{
        currentCity,
        setCurrentCity: _setCurrentCity,
      }}
    >
      {children}
    </CityContext.Provider>
  )
}
