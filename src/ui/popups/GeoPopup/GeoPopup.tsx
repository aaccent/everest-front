'use client'

import React, { useContext, useEffect, useState } from 'react'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Checkbox from '@/ui/inputs/Checkbox'
import { PopupContext } from '@/features/Popup'
import { getLocation } from '@/globals/api'
import { City, Location } from '@/types/Geo'
import { CityContext } from '@/globals/CityContext'

interface GeoPopupProps {
  selectGeoAuto: () => void
}

function GeoPopup({ selectGeoAuto }: GeoPopupProps) {
  const [location, setLocation] = useState<Location | null>(null)
  const { closePopup } = useContext(PopupContext)
  const { setCurrentCity } = useContext(CityContext)

  useEffect(() => {
    getLocation().then(setLocation)
  }, [])

  const onCheckboxClick = () => {
    selectGeoAuto()
    closePopup()
  }

  const onCityClick = (city: City) => {
    setCurrentCity(city)
    closePopup()
  }

  function showCitiesList() {
    const name = location?.name
    return location?.cities.map((city) => {
      return (
        <button
          className='border-b border-b-base-600/10 pb-[16px] text-left'
          onClick={() => onCityClick(city)}
          key={city.id}
        >
          <div className='text-base-200-lg-100 mb-[4px]'>{city.name}</div>
          <div className='text-base-400-lg-100 text-base-650'>{name}</div>
        </button>
      )
    })
  }

  return (
    <div className='absolute inset-x-0 bottom-0 flex h-[calc(100dvh-64px)] flex-col rounded-t-[24px] bg-base-100 p-[24px] md:bottom-auto md:top-0 md:rounded-b-[32px] md:rounded-t-none md:p-[56px]'>
      <div className='mb-[24px] flex items-center justify-end md:mb-[32px]'>
        <div className='text-header-300 md:text-header-100 w-full text-center md:text-left md:uppercase'>Ваш город</div>
        <ClosePopupButton className='' />
      </div>
      <Checkbox
        name='geo'
        title='определить автоматически'
        value='определить автоматически'
        onChange={onCheckboxClick}
      />
      <div className='mt-[24px] h-full overflow-y-auto scrollbar-transparent md:mr-[-46px] md:mt-[32px] md:pr-[44px] md:scrollbar-custom'>
        <div className='flex flex-col gap-[16px]'>{showCitiesList()}</div>
      </div>
    </div>
  )
}

export default GeoPopup
