'use client'
import React from 'react'
import ComplexCard from '@/ui/cards/ComplexCard/ComplexCard'
import Carousel, {
  CarouselInner,
  CarouselProgressBar,
  CarouselSlide,
  CarouselNavigations,
} from '@/components/Carousel/Carousel'
import { ComplexObject } from '@/types/catalog/Complex'
import SeeAllCard from '@/ui/cards/SeeAllCard'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import ObjectCard from '@/ui/cards/ObjectCard/ObjectCard'

export type SliderProps = {
  link: string
} & (
  | {
      type: 'complex'
      list: ComplexObject[]
    }
  | {
      type: 'objects'
      list: DefaultObject[]
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
        return (
          <>
            {list.map((card) => (
              <CarouselSlide
                className='slider group mr-[12px] max-w-[320px] md:mr-0 md:max-w-none md:basis-1/3 md:pr-[16px] md:[&:nth-child(3n)]:pr-0 md:[&:nth-child(4n)]:pl-[16px]'
                key={card.id}
              >
                <ObjectCard item={card} />
              </CarouselSlide>
            ))}
            <SeeAllCard className='h-[210px] md:h-[340px]' link={link} />
          </>
        )
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
