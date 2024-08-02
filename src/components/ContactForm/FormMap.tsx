'use client'
import React, { useEffect, useRef, useState } from 'react'
import { MapRef, Marker } from 'react-map-gl'
import { LngLatBounds } from 'mapbox-gl'
import Image from 'next/image'
import Link from 'next/link'

import CustomMap from '@/components/CustomMap'

import logoMini from '@/assets/static/logo-mini.svg'
import mapBavel from '@/assets/static/decorative-bg/map-bavel.svg'

interface Address {
  id: string
  coords: {
    latitude: number
    longitude: number
  }
  default?: boolean
  address: string
}

interface Props {
  list: Address[]
  city: string
}

function FormMap(props: Props) {
  const [currentAddress, setCurrentAddress] = useState(props.list.find((address) => address.default))
  const mapRef = useRef<MapRef>(null)
  const initBounds = props.list.reduce((bounds, address) => {
    return bounds.extend({ lat: address.coords.latitude, lng: address.coords.longitude })
  }, new LngLatBounds())

  useEffect(() => {
    let bound: LngLatBounds = new LngLatBounds()
    props.list?.forEach((address) => bound.extend({ lat: address.coords.latitude, lng: address.coords.longitude }))
    mapRef.current?.fitBounds(bound, {
      padding: { top: 100, right: 100, bottom: 100, left: 100 },
      maxZoom: 14,
    })
  }, [props.list])

  function showMarkers() {
    return props.list.map((address) => {
      const isActive = address === currentAddress

      return (
        <Marker {...address.coords} key={address.id} onClick={() => setCurrentAddress(address)}>
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
      customProps={{
        initialViewState: {
          zoom: 14,
          bounds: initBounds,
          fitBoundsOptions: { padding: 50, minZoom: 25, maxZoom: 50 },
        },
      }}
    >
      <Image src={mapBavel} alt='' className='absolute right-0 top-0 hidden filter-primary md:block' />

      {showMarkers()}
      <div className='absolute bottom-[8px] left-[8px] right-[8px] flex items-center justify-between rounded-[20px] bg-base-100 px-[20px] py-[16px] md:bottom-[24px] md:left-[24px] md:right-[24px] md:rounded-[32px] md:p-[24px]'>
        <div className='flex flex-col gap-[6px]'>
          <div className='text-header-500 font-coolvetica'>{currentAddress?.address}</div>
          <div className='text-base-300-lg-100 text-base-650'>{`г. ${props.city}`}</div>
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
