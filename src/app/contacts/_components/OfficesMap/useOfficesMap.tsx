'use client'
import React, { useState } from 'react'
import { Office } from '@/types/Geo'
import { Marker } from 'react-map-gl'
import Image from 'next/image'
import logoMini from '@/assets/static/logo-mini.svg'
import { getContactMapCenter } from '@/app/contacts/_components/OfficesMap/getMapCenter'
import { MapViewState } from '@/components/CustomMap'

type OfficesMap = {
  showMarkers: () => React.JSX.Element[]
  selectedOffice: Office
  view: MapViewState
  setView: (view: MapViewState) => void
}

type Props = {
  offices: Office[]
}

export function useOfficesMap({ offices }: Props): OfficesMap {
  const [selectedOffice, setSelectedOffice] = useState(offices[0])
  const initView = getContactMapCenter(offices)
  const [view, setView] = useState<MapViewState>(initView)

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

  return {
    showMarkers,
    selectedOffice,
    view,
    setView,
  }
}
