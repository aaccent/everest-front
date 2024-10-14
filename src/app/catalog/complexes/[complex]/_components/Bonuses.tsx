import React from 'react'
import Section from '@/layout/Section'
import Carousel, {
  CarouselInner,
  CarouselNavigations,
  CarouselProgressBar,
  CarouselSlide,
} from '@/components/Carousel/Carousel'
import Img from '@/ui/Img'
import { getBonuses } from '@/globals/api'

export interface Bonus {
  id: number
  photoPath: string
  title: string
  text: string
}

async function Bonuses() {
  const bonuses = await getBonuses()

  function showBonuses() {
    return bonuses.map((bonus) => {
      return (
        <CarouselSlide
          key={bonus.id}
          className='min-h-[260px] w-full max-w-[320px] pr-[12px] md:max-w-none md:basis-1/3 md:pr-[16px]'
        >
          <div className='flex size-full flex-col rounded-[20px] border border-base-400 px-[20px] pb-[20px] pt-[72px] md:max-w-[512px] md:px-[32px] md:pb-[32px] md:pt-[98px]'>
            <Img
              src={bonus.photoPath}
              width={244}
              height={137}
              className='ml-auto mr-auto h-[85px] w-[152px] object-cover object-center md:mb-[42px] md:h-[137px] md:w-[244px]'
            />
            <div className='mt-auto'>
              <div className='text-header-300 mb-[4px] md:mb-[8px]'>{bonus.title}</div>
              <div className='text-base-200-lg-100 text-base-650'>{bonus.text}</div>
            </div>
          </div>
        </CarouselSlide>
      )
    })
  }

  return (
    <Section>
      <Carousel className='relative'>
        <h2 className='text-header-200 mb-[40px] uppercase'>Бонусы от партнеров</h2>
        <CarouselNavigations />
        <CarouselInner>{showBonuses()}</CarouselInner>
        <CarouselProgressBar className='mt-[64px] hidden md:block' />
      </Carousel>
    </Section>
  )
}

export default Bonuses
