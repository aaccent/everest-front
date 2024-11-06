'use client'
import React, { useState } from 'react'
import { Office } from '@/types/Geo'
import { Marker } from 'react-map-gl'
import Image from 'next/image'
import logoMini from '@/assets/static/logo-mini.svg'
import { getContactMapCenter } from '@/app/contacts/_components/OfficesMap/getContactMapCenter'
import { MapViewState } from '@/components/CustomMap'

export const DEFAULT_OFFICES: Office[] = [
  {
    id: 1,
    address: 'Абакан Кирова 97',
    email: 'realteverest@bk.ru',
    phone: '7 3902 313-393',
    photo: null,
    work_week_day_from: 'Понедельник',
    work_week_day_to: 'Пятница',
    work_time_from: '9:00',
    work_time_to: '18:00',
    latitude: 53.726953,
    longitude: 91.439683,
    city: {
      id: 1,
      name: 'Абакан',
      latitude: 53.745802,
      longitude: 91.436944,
    },
  },
  {
    id: 2,
    address: 'Абакан Торосова 15',
    email: 'realteverest@bk.ru',
    phone: '7 3902 313-393',
    photo: null,
    work_week_day_from: 'Понедельник',
    work_week_day_to: 'Пятница',
    work_time_from: '9:00',
    work_time_to: '18:00',
    latitude: 53.741425,
    longitude: 91.421852,
    city: {
      id: 1,
      name: 'Абакан',
      latitude: 53.745802,
      longitude: 91.436944,
    },
  },
]

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
  const [selectedOffice, setSelectedOffice] = useState<Office>(offices[0])
  const initView = getContactMapCenter(offices)
  const [view, setView] = useState<MapViewState>(initView)

  function showMarkers() {
    return offices.map((office) => {
      const isActive = Number(office.id) === Number(selectedOffice.id)

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
