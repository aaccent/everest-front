'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { CarouselContext } from '@/components/Carousel/Carousel'

interface Props {
  className?: string
  slides?: {
    perView: number
    amount: number
  }
}

export function CarouselProgressBar({ className, slides }: Props) {
  const initProgress = slides ? (100 / (slides.amount + 1) / 100) * slides.perView : 0

  const { emblaApi } = useContext(CarouselContext)
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
    <div
      className={`relative bottom-[-74px] hidden h-[4px] w-full overflow-hidden rounded-[10px] bg-base-600/15 md:block ${className}`}
    >
      <div className='absolute bottom-0 top-0 bg-primary' style={{ width: `${scrollProgress}%` }}></div>
    </div>
  )
}
