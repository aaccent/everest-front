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
      <Carousel align={'start'} navigations progressBar>
        {props.list.map((card) => (
          <CarouselSlide
            className='mr-[12px] max-w-[320px] md:mr-0 md:max-w-none md:basis-1/3 md:pr-[16px] md:[&:nth-child(3n)]:pr-0 md:[&:nth-child(4n)]:pl-[16px]'
            key={card.id}
          >
            <NewBuildingCard {...card} />
          </CarouselSlide>
        ))}
        <Link
          href={'#'}
          className='min-w-0" relative block max-w-[320px] shrink-0 grow-0 basis-full rounded-[20px] bg-base-300 p-[16px] md:max-w-[512px] md:rounded-[32px] md:p-[32px]'
        >
          <div className='ml-auto flex size-[40px] items-center justify-center rounded-full bg-base-100 after:block after:size-[12px] after:-rotate-45 after:bg-icon-arrow after:bg-contain after:bg-center after:bg-no-repeat after:filter-base-600 md:size-[80px]'></div>
          <div className='text-header-300 absolute bottom-[16px] left-[16px] md:bottom-[32px] md:left-[32px]'>
            {' '}
            Смотреть все
          </div>
        </Link>
      </Carousel>
    </>
  )
}

export default Slider
