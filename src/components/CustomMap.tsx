'use client'

import React, { ReactNode } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { MapProps } from 'react-map-gl'

type CustomMapProps = {
  initialViewState: MapProps['initialViewState']
}

interface Props {
  className: string
  children: ReactNode
  customProps: CustomMapProps
}

function CustomMap({ className, children, customProps }: Props) {
  return (
    <div className={`map-box overflow-hidden ${className}`}>
      <Map
        mapboxAccessToken='pk.eyJ1Ijoic2V2YS1hYWNjZW50IiwiYSI6ImNscjd0N2cxczBkbG4yam54ZGFnZGkzM2oifQ.FhpqT7irCZDKdM6pd4ggjw'
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        {children}
      </Map>
    </div>
  )
}

export default CustomMap
