'use client'

import React from 'react'
import Img from '@/ui/Img'
import { Marker } from 'react-map-gl'
import ActiveMarkerSVG from '@/assets/static/map/active-marker.svg'

interface Props {
  longitude: number
  latitude: number
}

export default function ObjectsMapActivePoint({ ...props }: Props) {
  return (
    <Marker {...props} anchor='bottom'>
      <div className='relative h-[53px] w-[48px]'>
        <Img src={ActiveMarkerSVG} isSVG />
      </div>
    </Marker>
  )
}
