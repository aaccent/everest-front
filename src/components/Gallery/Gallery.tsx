'use client'
import React, { useContext } from 'react'
import { CarouselSlide } from '@/components/Carousel/CarouselSlide'
import Img from '@/ui/Img'
import Carousel, { CarouselInner, CarouselProgressBar } from '@/components/Carousel/Carousel'
import { PopupContext } from '@/components/Popup/Popup'

interface GalleryProps {
  list: string[]
}

function GallerySlide({ image, index }: { image: string; index: number }) {
  const { openPopup } = useContext(PopupContext)

  return (
    <CarouselSlide
      className='relative before:absolute before:inset-0 before:z-10 before:bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)100%);] before:opacity-50'
      onClick={() => openPopup('galleryPopup')}
    >
      <Img className='block h-full w-full' src='/no-photo.jpg' fill />
    </CarouselSlide>
  )
}

function Gallery({ list }: GalleryProps) {
  function showImages() {
    return list.map((img, i) => <GallerySlide image={img} index={i} key={i} />)
  }

  return (
    <Carousel className='h-full'>
      <CarouselInner>{showImages()}</CarouselInner>
      <CarouselProgressBar className='absolute inset-x-[92px] bottom-[24px] z-10 block !w-auto *:bg-base-100' />
    </Carousel>
  )
}

export default Gallery
