'use client'

import React, { useContext } from 'react'
import { PopupContext } from '@/features/Popup'
import { CityContext } from '@/globals/CityContext'
import { City } from '@/types/Geo'

type Props = {
  autoSelectedCity: City
}

function CityButton({ autoSelectedCity }: Props) {
  const { currentCity } = useContext(CityContext)
  const { openPopup } = useContext(PopupContext)
  const { setCurrentCity } = useContext(CityContext)

  const selectGeoAuto = () => {
    setCurrentCity(autoSelectedCity)
  }

  function clickHandler() {
    openPopup({
      name: 'geoPopup',
      args: {
        selectGeoAuto,
      },
    })
  }

  return (
    <button
      className='text-base-500-reg-100-upper flex items-center gap-[4px] before:size-[17px] before:bg-icon-location before:filter-base-100 before:bg-default peer-any-parent-[.is-black]/header-state:before:filter-primary'
      onClick={clickHandler}
    >
      {currentCity?.name || 'Абакан'}
    </button>
  )
}

export default CityButton
