'use client'
import React, { useEffect, useRef, useState } from 'react'
import CustomMap from '@/components/CustomMap'
import { MapRef, Marker } from 'react-map-gl'
import { LngLatBounds } from 'mapbox-gl'
import Image from 'next/image'
import logoMini from '@/assets/static/logo-mini.svg'
import mapBavel from '@/assets/static/map-bavel.svg'
import Link from 'next/link'

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

  function showMarkers() {
    const markerStyle = (marker: Address) => {
      return marker === currentAddress
        ? {
            bg: 'bg-primary',
            filter: 'filter-base-100',
          }
        : {
            bg: 'bg-base-100',
            filter: 'filter-primary',
          }
    }

    return props.list.map((address) => (
      <Marker {...address.coords} key={address.id} onClick={() => setCurrentAddress(address)}>
        <div
          className={`flex justify-center items-center size-[56px] rounded-full ${markerStyle(address).bg} md:size-[82px]`}
        >
          <Image
            src={logoMini}
            alt={''}
            className={`relative top-[-2px] w-[26px] object-cover object-center ${markerStyle(address).filter} md:top-[-4px] md:w-[44px]`}
          />
        </div>
      </Marker>
    ))
  }

  useEffect(() => {
    let bound: LngLatBounds = new LngLatBounds()
    props.list?.forEach((address) => bound.extend({ lat: address.coords.latitude, lng: address.coords.longitude }))
    mapRef.current?.fitBounds(bound, {
      padding: 100,
      maxZoom: 14,
    })
  }, [props.list])

  return (
    <CustomMap
      className={'w-full h-[420px] rounded-[20px] md:w-[649px] md:h-[618px]'}
      customProps={{
        initialViewState: {
          zoom: 14,
          bounds: initBounds,
          fitBoundsOptions: { padding: 50, minZoom: 25, maxZoom: 50 },
        },
      }}
    >
      <Image src={mapBavel} alt={''} className='hidden absolute right-0 top-0 filter-primary md:block' />

      {showMarkers()}
      <div className='absolute bottom-[8px] right-[8px] left-[8px] px-[20px] py-[16px] flex justify-between items-center bg-base-100 rounded-[20px] md:bottom-[24px] md:right-[24px] md:left-[24px] md:p-[24px] md:rounded-[32px]'>
        <div className='flex flex-col gap-[6px]'>
          <div className='text-header-500 font-coolvetica'>{currentAddress?.address}</div>
          <div className='text-base-300-lg-100 text-base-650'>{`г. ${props.city}`}</div>
        </div>
        <Link
          href={'#'}
          className=' py-[11px] px-[16px] flex justify-center bg-base-300 rounded-[14px] text-center text-base-500-reg-100-upper'
        >
          маршрут
        </Link>
      </div>
    </CustomMap>
  )
}

export default FormMap
