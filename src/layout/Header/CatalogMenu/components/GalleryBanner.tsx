'use client'
import React from 'react'
import Carousel, { CarouselInner, CarouselSlide } from '@/components/Carousel/Carousel'
import { ComplexCard } from '@/types/Complex'
import { ComplexTileCard } from '@/ui/cards/ComplexCard/ComplexTileCard'
import {
  CarouselNavigationButtonNext,
  CarouselNavigationButtonPrev,
} from '@/components/Carousel/components/CarouselNavigationButtons'

function GalleryBanner({ list }: { list: ComplexCard[] }) {
  return (
    <Carousel className='relative w-full max-w-[645px] overflow-hidden rounded-[32px]' fade>
      <CarouselInner>
        {list.map((card) => {
          return (
            <CarouselSlide key={card.id}>
              <div className='size-full'>
                <ComplexTileCard item={card} className='!h-full' isBanner />
              </div>
            </CarouselSlide>
          )
        })}
      </CarouselInner>
      <div className='absolute right-[30px] top-[30px] z-10 flex items-center gap-[10px]'>
        <CarouselNavigationButtonPrev className='flex items-center justify-center bg-base-650 backdrop-blur-md circle-[64px] after:block after:size-full after:rotate-180 after:bg-icon-arrow after:bg-default-auto' />
        <CarouselNavigationButtonNext className='flex items-center justify-center bg-base-650 backdrop-blur-md circle-[64px] after:block after:size-full after:bg-icon-arrow after:bg-default-auto' />
      </div>
    </Carousel>
  )
}

export default GalleryBanner
