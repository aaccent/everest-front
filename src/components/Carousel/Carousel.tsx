'use client'

import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Link from 'next/link'

export type CarouselProps = EmblaOptionsType & PropsWithChildren

function Carousel({ children, ...options }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const [scrollProgress, setScrollProgress] = useState(0)
  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])
  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll).on('scroll', onScroll).on('slideFocus', onScroll)
  }, [emblaApi, onScroll])

  return (
    <div>
      <div className='md:overflow-hidden' ref={emblaRef}>
        <div className='flex gap-[12px] md:gap-[16px]'>{children}</div>
      </div>
      <div className='absolute right-0 top-[20px] hidden h-[42px] w-[89px] overflow-hidden rounded-[12px] bg-base-300 md:block'>
        <div className='aftre:block aftre:block relative flex h-full w-full before:absolute before:bottom-0 before:left-[50%] before:h-[8px] before:w-[1px] before:translate-x-1/2 before:bg-base-400 after:absolute after:left-[50%] after:top-0 after:h-[8px] after:w-[1px] after:translate-x-1/2 after:bg-base-400'>
          <button
            className='button-prev flex w-1/2 items-center justify-center p-[16px] after:block after:size-full after:rotate-180 after:bg-icon-arrow after:bg-contain after:bg-center after:bg-no-repeat after:filter-base-600'
            onClick={scrollPrev}
          ></button>
          <button
            className='button-next flex w-1/2 items-center justify-center p-[16px] after:block after:size-full after:bg-icon-arrow after:bg-contain after:bg-center after:bg-no-repeat after:filter-base-600'
            onClick={scrollNext}
          ></button>
        </div>
      </div>
      <Link
        href={'#'}
        className='text-base-500-reg-100-upper absolute right-0 top-[5px] flex w-[70px] justify-center gap-[4px] overflow-hidden rounded-[12px] bg-base-300 py-[10px] after:block after:size-[14px] after:rotate-90 after:bg-icon-arrow-up after:bg-contain after:bg-center after:bg-no-repeat after:filter-base-600 md:hidden'
      >
        все
      </Link>
      <div className='relative bottom-[-74px] h-[4px] w-full overflow-hidden rounded-[10px] bg-primary'>
        <div
          className='absolute bottom-0 left-[-100%] top-0 w-full bg-primary'
          style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
        ></div>
      </div>
    </div>
  )
}

interface CarouselSlideProps extends PropsWithChildren {
  className: string
}

export function CarouselSlide(props: CarouselSlideProps) {
  return <div className={`shrink-0 grow-0 basis-full ${props.className}`}>{props.children}</div>
}

export default Carousel
