import React from 'react'

import NewBuildingCard from '@/components/Cards/NewBuildingCard/NewBuildingCard'
import Carousel, { CarouselSlide } from '@/components/Carousel/Carousel'

interface FlatTypes {
  id: string
  name: string
  'min-square': number
  'min-price': number
}

interface Card {
  id: string
  name: string
  address: string
  'text-code': string
  'category-code': string
  'min-price': number
  status: number
  tags: string[]
  'flat-types': FlatTypes[]
  photos: string[]
}

interface SliderProps {
  list: Card[]
}

function Slider(props: SliderProps) {
  return (
    <>
      <Carousel align={'start'}>
        {props.list.map((card) => (
          <CarouselSlide className='max-w-[320px] md:max-w-[512px] min-w-0' key={card.id}>
            <NewBuildingCard {...card} />
          </CarouselSlide>
        ))}
      </Carousel>
    </>
  )
}

export default Slider
