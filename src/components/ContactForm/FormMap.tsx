'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CustomMap from '@/components/CustomMap'
import mapBavel from '@/assets/static/decorative-bg/map-bavel.svg'
import { Office } from '@/types/Geo'
import { DEFAULT_OFFICES, useOfficesMap } from '@/app/contacts/_components/OfficesMap/useOfficesMap'
import { CityContext } from '@/globals/CityContext'
import { getOffices } from '@/globals/api/methods/geo/getOffices'

function FormMap() {
  const { currentCity } = useContext(CityContext)
  const [offices, setOffices] = useState<Office[]>(DEFAULT_OFFICES)
  const { showMarkers, selectedOffice, view, setView } = useOfficesMap({ offices })

  useEffect(() => {
    getOffices(Number(currentCity.id)).then((res) => res.length && setOffices(res))
  }, [currentCity])

  return (
    <CustomMap
      className='h-[420px] w-full rounded-[20px] md:h-[618px] md:w-[649px]'
      viewState={view}
      setViewState={setView}
    >
      <Image src={mapBavel} alt='' className='absolute right-0 top-0 hidden filter-primary md:block' />
      {showMarkers()}
      <div className='absolute bottom-[8px] left-[8px] right-[8px] flex items-center justify-between rounded-[20px] bg-base-100 px-[20px] py-[16px] md:bottom-[24px] md:left-[24px] md:right-[24px] md:rounded-[32px] md:p-[24px]'>
        <div className='flex flex-col gap-[6px]'>
          <div className='text-header-500 font-coolvetica'>{selectedOffice.address}</div>
          <div className='text-base-300-lg-100 text-base-650'>{selectedOffice.city.name}</div>
        </div>
        <Link
          href='#'
          className='text-base-500-reg-100-upper flex justify-center rounded-[14px] bg-base-300 px-[16px] py-[11px] text-center'
        >
          маршрут
        </Link>
      </div>
    </CustomMap>
  )
}

export default FormMap
