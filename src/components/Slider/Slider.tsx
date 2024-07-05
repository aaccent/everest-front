import React from 'react'

import NewBuildingCard from '@/components/Cards/NewBuildingCard/NewBuildingCard'
import Carousel, { CarouselSlide } from '@/components/Carousel/Carousel'
import Link from 'next/link'

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
        <Link
          href={'#'}
          className='relative block p-[16px] basis-full shrink-0 grow-0 max-w-[320px] md:max-w-[512px] min-w-0" bg-base-300 rounded-[20px] md:p-[32px] md:rounded-[32px]'
        >
          <div className='flex justify-center items-center ml-auto size-[40px] rounded-full bg-base-100 after:bg-icon-arrow after:bg-no-repeat after:bg-center after:bg-contain after:filter-base-600 after:size-[12px] after:block after:-rotate-45 md:size-[80px]'></div>
          <div className='absolute bottom-[16px] left-[16px] text-header-300 md:bottom-[32px] md:left-[32px]'>
            {' '}
            Смотреть все
          </div>
        </Link>
      </Carousel>
    </>
  )
}

export default Slider
