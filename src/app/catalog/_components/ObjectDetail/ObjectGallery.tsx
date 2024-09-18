'use client'
import React, { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import { CarouselSlide } from '@/components/Carousel/CarouselSlide'
import Img from '@/ui/Img'
import Carousel, { CarouselContext, CarouselInner, CarouselProgressBar } from '@/components/Carousel/Carousel'
import { PopupContext } from '@/features/visible/Popup'
import { EmblaCarouselType } from 'embla-carousel'
import {
  CarouselNavigationButtonNext,
  CarouselNavigationButtonPrev,
} from '@/components/Carousel/components/CarouselNavigationButtons'
import { useSearchParams } from 'next/navigation'
import GalleryPopup from '@/ui/popups/GalleryPopup/GalleryPopup'

interface ThumbsProps {
  onSlideChange: Dispatch<SetStateAction<number>>
  children: React.ReactNode
}

function Thumbs({ onSlideChange, children }: ThumbsProps) {
  const { emblaApi } = useContext(CarouselContext)

  const slideChange = useCallback(
    (emblaApi: EmblaCarouselType) => {
      onSlideChange(emblaApi.selectedScrollSnap())
    },
    [onSlideChange],
  )

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('init', slideChange).on('select', slideChange).on('reInit', slideChange)
  }, [emblaApi])

  return (
    <div className='absolute bottom-[24px] left-1/2 hidden w-full max-w-[360px] -translate-x-1/2 overflow-hidden rounded-[24px] bg-base-600 px-[54px] py-[16px] md:block'>
      {children}
    </div>
  )
}

interface MiniImagesProps {
  activeSlideIndex: number
  children: React.ReactNode
}

function MiniImages({ activeSlideIndex, children }: MiniImagesProps) {
  const { emblaApi } = useContext(CarouselContext)

  useEffect(() => {
    emblaApi?.scrollTo(activeSlideIndex)
  }, [activeSlideIndex])

  return <>{children}</>
}

interface GalleryProps {
  list: string[]
}

function ObjectGallery({ list }: GalleryProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
  const { openPopup } = useContext(PopupContext)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.has('gallery')) {
      openPopup('galleryPopup')
    }
  }, [])

  const onSlideClickHandle = () => {
    if (window.matchMedia('(min-width:768px)').matches) {
      openPopup('galleryPopup')
    }
  }

  function showImages() {
    return list.map((image, i) => (
      <CarouselSlide
        key={i}
        className='relative before:absolute before:inset-0 before:z-10 before:bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)100%);] before:opacity-50'
        onClick={onSlideClickHandle}
      >
        <Img className='block h-full w-full' src={image} fill />
      </CarouselSlide>
    ))
  }

  function showThumbs() {
    return list.map((image, index) => (
      <CarouselSlide
        className='relative flex !basis-1/4 cursor-pointer justify-center'
        key={index}
        onClick={() => setActiveSlideIndex(index)}
      >
        <Img
          src={image}
          key={index}
          width={54}
          height={54}
          className='size-[54px] rounded-[10px] object-cover object-center'
        />
        <div
          className={`absolute inset-x-1/2 size-[54px] -translate-x-1/2 rounded-[10px] bg-[#D9D9D9]/40 ${index === activeSlideIndex ? 'hidden' : 'block'}`}
        />
      </CarouselSlide>
    ))
  }

  return (
    <Carousel className='relative h-full' fade>
      <CarouselInner>{showImages()}</CarouselInner>
      <button
        type='button'
        className='absolute right-[20px] top-[35px] size-[42px] rounded-full bg-base-650 bg-icon-zoom-arrows bg-default-auto md:hidden'
        onClick={() => openPopup('galleryPopup')}
      />
      <Thumbs onSlideChange={setActiveSlideIndex}>
        <Carousel>
          <CarouselInner>
            <MiniImages activeSlideIndex={activeSlideIndex}>{showThumbs()}</MiniImages>
          </CarouselInner>
        </Carousel>

        <CarouselNavigationButtonPrev className='absolute left-[22px] top-1/2 size-[20px] -translate-y-1/2 rotate-180 bg-icon-arrow bg-default-auto' />
        <CarouselNavigationButtonNext className='absolute right-[22px] top-1/2 size-[20px] -translate-y-1/2 bg-icon-arrow bg-default-auto' />
      </Thumbs>
      <CarouselProgressBar className='absolute bottom-[24px] left-1/2 max-w-[166px] -translate-x-1/2 bg-base-115 *:bg-base-100 md:hidden' />
      <button className='flex size-[42px] items-center justify-center rounded-full bg-base-650 after:block after:size-full after:bg-icon-zoom-arrows after:bg-default-contain md:hidden' />
      <GalleryPopup list={list} activeSlideIndex={activeSlideIndex} />
    </Carousel>
  )
}

export default ObjectGallery
