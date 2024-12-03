'use client'

import React from 'react'
import MapImage from '@/assets/static/general/map.jpg'
import Img from '@/ui/Img'
import { ROUTES } from '@/globals/paths'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Props {
  className?: string
  categoryName: string
  onClick?: () => void
}

function MapObjectsButton({ className, categoryName, onClick }: Props) {
  const searchParams = useSearchParams()
  const mapLink = `${ROUTES.MAP}/${categoryName}/?${searchParams.toString()}`
  return (
    <Link
      href={mapLink}
      className={`relative flex size-[42px] items-center justify-center overflow-hidden rounded-[12px] bg-base-100 md:w-[70px] ${className}`}
      onClick={onClick}
    >
      <Img fill src={MapImage} />
      <span className='absolute flex size-[26px] items-center justify-center rounded-full bg-base-100 before:size-[12px] before:bg-icon-address before:bg-default md:size-[30px] md:before:size-[14px]' />
    </Link>
  )
}

export default MapObjectsButton
