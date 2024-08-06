'use client'

import React from 'react'
import MapImage from '@/assets/static/general/map.jpg'
import Img from '@/ui/Img'

interface Props {
  className?: string
}

function MapObjectsButton({ className }: Props) {
  return (
    <button
      className={`relative flex size-[42px] items-center justify-center overflow-hidden rounded-[12px] bg-base-100 md:w-[70px] ${className}`}
    >
      <Img fill src={MapImage} />
      <span className='absolute flex size-[26px] items-center justify-center rounded-full bg-base-100 before:size-[12px] before:bg-icon-address before:bg-default md:size-[30px] md:before:size-[14px]' />
    </button>
  )
}

export default MapObjectsButton
