'use client'

import React, { useCallback, useContext } from 'react'
import { CarouselContext } from '@/components/Carousel/Carousel'

export function CarouselNavigationButtonPrev() {
  const { emblaApi } = useContext(CarouselContext)

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  return (
    <button
      className='button-prev flex w-1/2 items-center justify-center p-[16px] after:block after:size-full after:rotate-180 after:bg-icon-arrow after:bg-contain after:bg-center after:bg-no-repeat after:filter-base-600'
      onClick={scrollPrev}
    ></button>
  )
}

export function CarouselNavigationButtonNext() {
  const { emblaApi } = useContext(CarouselContext)

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <button
      className='button-next flex w-1/2 items-center justify-center p-[16px] after:block after:size-full after:bg-icon-arrow after:bg-contain after:bg-center after:bg-no-repeat after:filter-base-600'
      onClick={scrollNext}
    ></button>
  )
}
