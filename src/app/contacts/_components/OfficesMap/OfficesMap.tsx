'use client'
import React, { useContext, useEffect, useState } from 'react'
import CustomMap from '@/components/CustomMap'
import { City, Office } from '@/types/Geo'
import TabButtons, { TabButtonItem } from '@/components/TabButtons'
import { getOffices } from '@/globals/api/methods/geo/getOffices'
import { getContactMapCenter } from '@/app/contacts/_components/OfficesMap/getContactMapCenter'
import { useOfficesMap } from '@/app/contacts/_components/OfficesMap/useOfficesMap'
import { AdaptiveContext } from '@/features/adaptive'
import logoMini from '@/assets/static/logo-mini.svg'
import Img from '@/ui/Img'
import Button from '@/ui/buttons/Button'
import Link from 'next/link'
import { TEST_ID } from '@/globals/testIds'

function DetailedOfficeInfo({ activeOffice }: { activeOffice: Office }) {
  const [full, setFull] = useState<boolean>(false)
  const { isMobile } = useContext(AdaptiveContext)

  function replaceMinusToTilda(number: number) {
    return number.toString().replace('-', '~')
  }

  const href = `https://yandex.ru/maps/?mode=routes&rtext=${replaceMinusToTilda(activeOffice.latitude)}%2C${replaceMinusToTilda(activeOffice.longitude)}`

  useEffect(() => {
    if (!isMobile) setFull(true)
  }, [])

  return (
    <div
      className={`absolute inset-x-[10px] bottom-[10px] flex flex-col ${full ? 'top-[10px]' : ''} rounded-[20px] bg-base-100 p-[16px] md:bottom-auto md:left-[24px] md:right-auto md:top-[24px] md:h-[519px] md:w-full md:max-w-[382px] md:rounded-[32px] md:p-[20px]`}
      data-testid={TEST_ID.DETAIL_OFFICE_INFO}
    >
      <div className='flex items-center'>
        <div className='mr-[12px] flex items-center justify-center bg-primary circle-[40px] md:circle-[48px]'>
          <Img src={logoMini} className='w-[24px] pb-[4px]' />
        </div>
        <div className='flex flex-col gap-[2px]'>
          <div className='text-base-300-lg-100'>{activeOffice.address}</div>
          <div className='text-base-400-lg-100 text-base-650'>Главный офис</div>
        </div>
        {isMobile && (
          <button
            className={`ml-auto flex items-center justify-center bg-base-300 transition-transform circle-[36px] after:block after:size-[12px] after:bg-icon-close after:bg-default-contain ${full ? '' : 'rotate-45'}`}
            onClick={() => setFull((prev) => !prev)}
          />
        )}
      </div>
      <div
        className={`${full ? 'mt-[16px] flex h-full flex-col border-t border-t-base-600/10 pt-[16px]' : 'h-0 overflow-hidden'} md:border-none`}
      >
        <Img
          src={activeOffice.photo ?? '/slider-1.png'}
          width={298}
          height={199}
          className='mb-[20px] h-[199px] w-full overflow-hidden rounded-[20px] object-cover object-center'
        />
        <div className='mb-[16px] flex flex-col gap-[4px]'>
          <div className='text-base-400-lg-100 text-base-650'>График работы</div>
          <div className='text-base-300-lg-100'>
            <span>{activeOffice.work_time_from}</span> - <span>{activeOffice.work_time_to}</span>{' '}
            <span>с {activeOffice.work_week_day_from}</span>
            <span> по {activeOffice.work_week_day_to}</span>
          </div>
        </div>
        <div className='flex flex-col gap-[4px]'>
          <div className='text-base-400-lg-100 text-base-650'>Телефон</div>
          <div className='text-base-100-lg-100 md:text-base-100-reg-100'>{activeOffice.phone}</div>
        </div>
        <Button variation='second' size='medium' className='mt-auto w-full text-center'>
          <Link href={href} target='_blank'>
            проложить маршрут
          </Link>
        </Button>
      </div>
    </div>
  )
}

interface Props {
  cities: City[]
  offices: Office[]
}

function OfficesMap({ cities, offices }: Props) {
  const buttons: TabButtonItem[] = cities.map((city) => {
    return {
      text: city.name,
      value: city.id,
    }
  })

  const [activeCity, setActiveCity] = useState<City>(cities[0])
  const [activeOffices, setActiveOffices] = useState<Office[]>(offices)
  const { showMarkers, selectedOffice, view, setView } = useOfficesMap({ offices: activeOffices })

  const onTabButtonClick = (id: string) => {
    const _activeCity = cities.find((city) => city.id === id)
    if (_activeCity) setActiveCity(_activeCity)
  }

  useEffect(() => {
    getOffices(Number(activeCity.id)).then((res) => setActiveOffices(res))
  }, [activeCity])

  useEffect(() => {
    setView(getContactMapCenter(activeOffices))
  }, [activeOffices])

  return (
    <>
      <div className='flex flex-col gap-[20px] md:flex-row md:items-end md:justify-between md:gap-0'>
        <h1 className='text-header-100 uppercase'>Контакты</h1>
        <TabButtons list={buttons} defaultActiveValue={activeCity.id} onChange={onTabButtonClick} />
      </div>
      <CustomMap
        className='mt-[24px] h-[529px] w-full overflow-hidden rounded-[20px] md:mt-[40px] md:h-[607px] md:rounded-[32px]'
        viewState={view}
        setViewState={setView}
      >
        <DetailedOfficeInfo activeOffice={selectedOffice} />
        {showMarkers()}
      </CustomMap>
    </>
  )
}

export default OfficesMap
