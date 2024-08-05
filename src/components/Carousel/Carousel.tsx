'use client'

import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import GrayButtons from '@/ui/navigation-buttons/GrayButtons'
import Fade from 'embla-carousel-fade'
import WhiteButtons from '@/ui/navigation-buttons/WhiteButtons'

type CarouselProps = EmblaOptionsType &
  PropsWithChildren & {
    progressBar?: boolean
    navigations?: 'gray' | 'white'
    btnsCLassName?: string
    progressClassName?: string
    fade?: boolean
    className?: string
    initProgress?: number
  }

function Carousel({
  children,
  progressBar,
  navigations,
  progressClassName,
  btnsCLassName,
  fade,
  className,
  initProgress,
  ...options
}: CarouselProps) {
  function isFade() {
    return fade === true ? [Fade()] : undefined
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, isFade())
  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(initProgress || 0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll).on('scroll', onScroll).on('slideFocus', onScroll)
  }, [emblaApi, onScroll])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  function progress() {
    return (
      <div
        className={`relative bottom-[-74px] h-[4px] overflow-hidden rounded-[10px] bg-base-600/15 ${progressClassName}`}
      >
        <div className='h-full bg-primary' style={{ width: `${scrollProgress}%` }}></div>
      </div>
    )
  }

  return (
    <div className='embla'>
      <div className={`md:overflow-hidden ${className}`} ref={emblaRef}>
        <div className='flex'>{children}</div>
      </div>
      {navigations === 'white' ? (
        <WhiteButtons scrollPrev={scrollPrev} scrollNext={scrollNext} className={btnsCLassName} />
      ) : (
        <GrayButtons scrollPrev={scrollPrev} scrollNext={scrollNext} className={btnsCLassName} />
      )}
      {progressBar && progress()}
    </div>
  )
}

interface CarouselSlideProps extends PropsWithChildren {
  className: string
}

export function CarouselSlide(props: CarouselSlideProps) {
  return <div className={`slide shrink-0 grow-0 basis-full ${props.className}`}>{props.children}</div>
}

export default Carousel
