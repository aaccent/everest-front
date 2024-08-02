import React from 'react'

import ComplexCard from '@/components/Cards/Complex/ComplexCard'
import Carousel, { CarouselSlide } from '@/components/Carousel/Carousel'
import Link from 'next/link'
import { Complex } from '@/types/Complex'
import SeeAllCard from '@/components/SeeAllCard'

interface SliderProps {
  list: Complex[]
}

function Slider(props: SliderProps) {
  return (
    <>
      <Carousel align='start' navigations progressBar>
        {props.list.map((card) => (
          <CarouselSlide
            className='mr-[12px] max-w-[320px] md:mr-0 md:max-w-none md:basis-1/3 md:pr-[16px] md:[&:nth-child(3n)]:pr-0 md:[&:nth-child(4n)]:pl-[16px]'
            key={card.id}
          >
            <ComplexCard item={card} />
          </CarouselSlide>
        ))}
        <SeeAllCard/>
      </Carousel>
    </>
  )
}

export default Slider
