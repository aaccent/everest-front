'use client'

import React, { useCallback, useContext } from 'react'
import { CarouselContext } from '@/components/Carousel/Carousel'

interface Props {
  className?: string
}

export function CarouselNavigationButtonPrev({ className }: Props) {
  const { emblaApi } = useContext(CarouselContext)

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  return <button className={className} onClick={scrollPrev}></button>
}

export function CarouselNavigationButtonNext({ className }: Props) {
  const { emblaApi } = useContext(CarouselContext)

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return <button className={className} onClick={scrollNext}></button>
}
