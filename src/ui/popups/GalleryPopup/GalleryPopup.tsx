'use client'
import React from 'react'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Img from '@/ui/Img'
import { CarouselSlide } from '@/components/Carousel/CarouselSlide'
import Carousel, { CarouselInner, CarouselProgressBar, CarouselWhiteNavigations } from '@/components/Carousel/Carousel'
import { Popup } from '@/features/visible/Popup'

interface GalleryPopupProps {
  list: string[]
  activeSlideIndex: number
}

function GalleryPopup({ list, activeSlideIndex }: GalleryPopupProps) {
  function showSlides() {
    return list.map((photo, i) => (
      <CarouselSlide key={i}>
        <div className='relative z-10 size-full after:absolute after:inset-0 after:block after:bg-base-600/40 md:hidden'>
          <Img
            src={photo}
            width={1680}
            height={726}
            className='absolute inset-0 h-full object-cover object-center blur-[11px]'
          />
        </div>

        <Img
          src={photo}
          width={1680}
          height={726}
          className='absolute inset-y-1/2 z-20 h-[290px] -translate-y-1/2 object-cover object-center md:h-full'
        />
      </CarouselSlide>
    ))
  }

  return (
    <Popup popupName='galleryPopup'>
      <Carousel
        className='text-header-300 md:text-header-200 absolute top-[64px] h-[calc(100svh-64px)] w-full overflow-hidden rounded-t-[24px] bg-base-100 text-base-100 md:bg-transparent md:uppercase'
        fade
        startIndex={activeSlideIndex}
      >
        <div className='absolute top-[33px] z-10 w-full text-center md:left-[56px] md:top-[55px] md:text-left'>
          Галерея <span className='opacity-50'>— {list.length} фото</span>
        </div>
        <CarouselInner>{showSlides()}</CarouselInner>
        <div className='absolute bottom-[32px] z-10 flex w-full items-end justify-center md:bottom-[56px] md:justify-between md:px-[56px]'>
          <CarouselProgressBar className='relative !w-[228px] *:bg-base-100' />
          <CarouselWhiteNavigations className='!static hidden md:flex' />
        </div>
        <ClosePopupButton className='absolute right-[24px] top-[33px] z-10 !bg-base-650 md:right-[56px] md:top-[103px]' />
      </Carousel>
    </Popup>
  )
}

export default GalleryPopup
