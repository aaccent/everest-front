'use client'
import React, { useState } from 'react'
import { Marker } from 'react-map-gl'
import { LngLatBounds } from 'mapbox-gl'
import Image from 'next/image'
import Link from 'next/link'

import CustomMap from '@/components/CustomMap'

import logoMini from '@/assets/static/logo-mini.svg'
import mapBavel from '@/assets/static/decorative-bg/map-bavel.svg'
import { Office } from '@/types/Geo'

interface Props {
  offices: Office[]
}

function FormMap({ offices }: Props) {
  const initBounds = offices.reduce((bounds, office) => {
    return bounds.extend({ lat: office.latitude, lng: office.longitude })
  }, new LngLatBounds())

  const center = {
    latitude: initBounds.getCenter().lat,
    longitude: initBounds.getCenter().lng,
  }

  const [selectedOffice, setSelectedOffice] = useState<Office>(offices[0])

  function showMarkers() {
    return offices.map((office) => {
      const isActive = office.id === selectedOffice.id

      return (
        <Marker
          latitude={office.latitude}
          longitude={office.longitude}
          key={office.id}
          onClick={() => setSelectedOffice(office)}
        >
          <div
            className={`group/marker flex size-[56px] items-center justify-center rounded-full ${isActive ? 'active bg-primary' : 'bg-base-100'} md:size-[82px]`}
          >
            <Image
              src={logoMini}
              alt=''
              className='relative top-[-2px] w-[26px] object-cover object-center filter-primary group-[.active]/marker:filter-base-100 md:top-[-4px] md:w-[44px]'
            />
          </div>
        </Marker>
      )
    })
  }

  return (
    <CustomMap
      className='h-[420px] w-full rounded-[20px] md:h-[618px] md:w-[649px]'
      initialCenter={center}
      initialZoom={13}
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
