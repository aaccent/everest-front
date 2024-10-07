'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CityContext } from '@/globals/CityContext'
import Button from '@/ui/buttons/Button'
import { hideScroll, showScroll } from '@/features/scroll'
import { City } from '@/types/Geo'

interface Props {
  cityByIp: City
}

function GeoPositionNotification({ cityByIp }: Props) {
  const [shown, setShown] = useState<boolean>(true)
  const { setCurrentCity } = useContext(CityContext)

  useEffect(() => {
    if (shown) hideScroll()
  }, [])

  const onOkCityClick = () => {
    setCurrentCity(cityByIp)
    setShown(false)
    showScroll()
  }

  return (
    shown && (
      <div className='fixed inset-0 z-50 bg-base-650'>
        <div className='absolute inset-x-0 bottom-0 rounded-t-[24px] bg-base-100 px-[24px] pb-[32px] pt-[24px] md:inset-x-auto md:right-[169px] md:top-[44px] md:h-fit md:w-[320px] md:rounded-b-[24px] md:pb-[24px]'>
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
              onClick={onOkCityClick}
            >
              Верно
            </Button>
            <Button className='order-1 md:order-2' type='button' variation='second' size='medium'>
              сменить
            </Button>
          </div>
        </div>
      </div>
    )
  )
}

export default GeoPositionNotification
