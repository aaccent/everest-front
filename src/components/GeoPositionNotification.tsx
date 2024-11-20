'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CityContext } from '@/globals/CityContext'
import Button from '@/ui/buttons/Button'
import { hideScroll, showScroll } from '@/features/scroll'
import { City } from '@/types/Geo'
import { PopupContext } from '@/features/Popup'
import { AdaptiveContext } from '@/features/adaptive'

interface Props {
  cityByIp: City
}

function GeoPositionNotification({ cityByIp }: Props) {
  const [shown, setShown] = useState<boolean>(true)
  const { setCurrentCity } = useContext(CityContext)
  const { openPopup } = useContext(PopupContext)
  const { isDesktop } = useContext(AdaptiveContext)

  useEffect(() => {
    if (isDesktop) return

    hideScroll()
  }, [])

  const onOkCityButtonClick = () => {
    setCurrentCity(cityByIp)
    setShown(false)
    showScroll()
  }

  const onChangeGeoButtonClick = () => {
    setShown(false)
    openPopup({
      name: 'geo',
      args: {
        onAutoGeolocationClick: onOkCityButtonClick,
      },
    })
  }

  if (!shown) return null

  return (
    <div className='fixed inset-x-0 bottom-0 z-[70] flex h-full w-full bg-base-600/60 md:inset-x-auto md:right-[169px] md:top-[44px] md:h-fit md:w-fit md:bg-transparent'>
      <div className='mt-auto w-full rounded-t-[24px] bg-base-100 px-[24px] pb-[32px] pt-[24px] md:rounded-b-[24px] md:pb-[24px]'>
        <div className='text-header-300 md:text-base-200-lg-100 mb-[32px] md:mb-[18px]'>
          <span className='text-base-650'>Ваш город — </span>
          <span>{cityByIp.name}?</span>
        </div>
        <div className='flex gap-[8px] md:gap-[12px]'>
          <Button
            className='order-2 md:order-1'
            type='button'
            variation='primary'
            size='medium'
            onClick={onOkCityButtonClick}
          >
            Верно
          </Button>
          <Button
            className='order-1 md:order-2'
            type='button'
            variation='second'
            size='medium'
            onClick={onChangeGeoButtonClick}
          >
            сменить
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GeoPositionNotification
