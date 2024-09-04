'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { CarouselContext } from '@/components/Carousel/Carousel'

interface Props {
  className?: string
  perView?: number
}

export function CarouselProgressBar({ className, perView = 1 }: Props) {
  const { emblaApi } = useContext(CarouselContext)
  const slidesAmount = emblaApi?.slideNodes().length
  const initProgress = slidesAmount ? (100 / (slidesAmount + 1) / 100) * perView : 0

  const [scrollProgress, setScrollProgress] = useState(initProgress)

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(initProgress, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)
    emblaApi.on('slideFocus', onScroll)
  }, [emblaApi])

  return (
    <div className={`h-[4px] w-full overflow-hidden rounded-[10px] bg-base-600/15 md:block ${className}`}>
      <div className='absolute bottom-0 top-0 bg-primary' style={{ width: `${scrollProgress}%` }}></div>
    </div>
  )
}
