'use client'

import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Link from 'next/link'

type CarouselProps = EmblaOptionsType & PropsWithChildren

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
      <div className='hidden absolute top-[20px] right-0 w-[89px] h-[42px] bg-base-300 rounded-[12px] overflow-hidden md:block'>
        <div className='relative flex w-full h-full after:absolute after:top-0 after:left-[50%] after:translate-x-1/2 aftre:block after:w-[1px] after:h-[8px] after:bg-base-400 before:absolute before:bottom-0 before:left-[50%] before:translate-x-1/2 aftre:block before:w-[1px] before:h-[8px] before:bg-base-400'>
          <button
            className='button-prev p-[16px] flex justify-center items-center w-1/2 after:block after:size-full after:filter-base-600 after:rotate-180 after:bg-center after:bg-contain after:bg-no-repeat after:bg-icon-arrow'
            onClick={scrollPrev}
          ></button>
          <button
            className='button-next p-[16px] flex justify-center items-center w-1/2 after:block after:size-full after:filter-base-600 after:bg-center after:bg-contain after:bg-no-repeat after:bg-icon-arrow'
            onClick={scrollNext}
          ></button>
        </div>
      </div>
      <Link
        href={'#'}
        className='absolute top-0 right-0 py-[10px] flex justify-center gap-[4px] w-[70px] bg-base-300 rounded-[12px] overflow-hidden text-base-500-reg-100-upper after:block after:size-[14px] after:rotate-90 after:bg-center after:bg-auto after:bg-no-repeat after:bg-icon-arrow-up md:hidden'
      >
        все
      </Link>
      <div className='relative w-full h-[4px] bg-primary rounded-[10px] bottom-[-74px] overflow-hidden'>
        <div
          className='absolute top-0 left-[-100%] bottom-0 bg-primary w-full'
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
  return <div className={`basis-full shrink-0 grow-0 ${props.className}`}>{props.children}</div>
}

export default Carousel
