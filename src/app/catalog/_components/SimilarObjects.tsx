'use client'
import React, { useState } from 'react'
import Section from '@/layout/Section'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import Carousel, { CarouselInner, CarouselProgressBar, CarouselSlide } from '@/components/Carousel/Carousel'
import ObjectCard from '@/ui/cards/ObjectCard/ObjectCard'
import {
  CarouselNavigationButtonNext,
  CarouselNavigationButtonPrev,
} from '@/components/Carousel/components/CarouselNavigationButtons'

interface SimilarObjectsProps {
  props: {
    similarByPrice: DefaultObject[]
    similarByMinArea: DefaultObject[]
  }
}

function SimilarObjects({ props }: SimilarObjectsProps) {
  const [type, setType] = useState<{ type: 'price' | 'minArea'; list: DefaultObject[] }>({
    type: 'price',
    list: props.similarByPrice,
  })

  function showObjects(list: DefaultObject[]) {
    return list.map((object) => {
      return (
        <CarouselSlide
          className='mr-[12px] max-w-[320px] md:mr-0 md:max-w-none md:basis-1/3 md:pr-[16px] md:[&:nth-child(3n)]:pr-0 md:[&:nth-child(4n)]:pl-[16px]'
          key={object.id}
        >
          <ObjectCard
            item={object}
            category={{
              seoUrl: object.typeObject,
            }}
          />
        </CarouselSlide>
      )
    })
  }

  return (
    <Section>
      <Carousel>
        <h2 className='text-header-200 mb-[16px] uppercase md:mb-[32px]'>Похожие квартиры</h2>
        <div className='mb-[32px] flex items-center justify-between'>
          <div className='*:text-base-500-reg-100-upper flex items-center gap-[8px] *:rounded-[50px] *:px-[14px] *:py-[10px]'>
            <button
              onClick={() => setType({ type: 'price', list: props.similarByPrice })}
              type='button'
              className={type.type === 'price' ? 'bg-primary text-base-100' : 'bg-base-300 text-base-600'}
            >
              По стоимости
            </button>
            <button
              onClick={() => setType({ type: 'minArea', list: props.similarByMinArea })}
              className={type.type === 'minArea' ? 'bg-primary text-base-100' : 'bg-base-300 text-base-600'}
            >
              По площади
            </button>
          </div>
          <div className='before::block relative hidden h-[42px] w-[89px] rounded-[12px] bg-base-300 *:w-1/2 before:absolute before:inset-x-1/2 before:bottom-0 before:h-[8px] before:w-[1px] before:-translate-x-1/2 before:bg-base-400 after:absolute after:inset-x-1/2 after:block after:h-[8px] after:w-[1px] after:-translate-x-1/2 after:bg-base-400 md:flex'>
            <CarouselNavigationButtonPrev className='rotate-180 bg-icon-arrow filter-base-600 bg-default-auto' />
            <CarouselNavigationButtonNext className='bg-icon-arrow filter-base-600 bg-default-auto' />
          </div>
        </div>
        <CarouselInner>{showObjects(type.list)}</CarouselInner>
        <CarouselProgressBar className='hidden md:mt-[70px]' />
      </Carousel>
    </Section>
  )
}

export default SimilarObjects
