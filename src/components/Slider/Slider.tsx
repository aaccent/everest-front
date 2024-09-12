'use client'
import React from 'react'
import ComplexCard from '@/components/Cards/Complex/ComplexCard'
import Carousel, {
  CarouselInner,
  CarouselProgressBar,
  CarouselSlide,
  CarouselNavigations,
} from '@/components/Carousel/Carousel'
import { ComplexCard as ComplexCardType } from '@/types/Complex'
import SeeAllCard from '@/components/SeeAllCard'
import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'

export type SliderProps = {
  link: string
} & (
  | {
      type: 'complex'
      list: ComplexCardType[]
    }
  | {
      type: 'objects'
      list: ObjectCardType[]
    }
)

function Slider({ list, type, link }: SliderProps) {
  function showSlides() {
    switch (type) {
      case 'complex':
        return (
          <>
            {list.map((card) => (
              <CarouselSlide
                className='mr-[12px] max-w-[320px] md:mr-0 md:max-w-none md:basis-1/3 md:pr-[16px] md:[&:nth-child(3n)]:pr-0 md:[&:nth-child(4n)]:pl-[16px]'
                key={card.id}
              >
                <ComplexCard item={card} />
              </CarouselSlide>
            ))}
            <SeeAllCard link={link} />
          </>
        )
      case 'objects':
        return list.map((card) => (
          <CarouselSlide
            className='mr-[12px] max-w-[320px] md:mr-0 md:max-w-none md:basis-1/3 md:pr-[16px] md:[&:nth-child(3n)]:pr-0 md:[&:nth-child(4n)]:pl-[16px]'
            key={card.id}
          >
            <ObjectCard category={{ breadcrumbs: [{ name: '', seo: card.typeObject }] }} item={card} />
          </CarouselSlide>
        ))
    }
  }

  return (
    <>
      <Carousel>
        <CarouselInner>{showSlides()}</CarouselInner>
        <CarouselNavigations />
        <CarouselProgressBar className='hidden md:mt-[70px] md:block' perView={3} />
      </Carousel>
    </>
  )
}

export default Slider
