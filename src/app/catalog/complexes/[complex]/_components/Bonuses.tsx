import React from 'react'
import Section from '@/layout/Section'
import Carousel, { CarouselInner, CarouselSlide } from '@/components/Carousel/Carousel'
import Img from '@/ui/Img'

interface Bonus {
  id: number
  image: string
  title: string
  description: string
}

const testBonuses = [
  {
    id: 1,
    image: '/bonuses/image 63.png',
    title: 'Hoff',
    description:
      'Скидка 20% на мебельСкидка 20% на мебельСкидка 20% на мебельСкидка 20% на мебельСкидка 20% на мебельСкидка 20% на мебель',
  },
  {
    id: 2,
    image: '/bonuses/image 631.png',
    title: 'Многомебели',
    description: 'Скидка 15% на мебель',
  },
  {
    id: 3,
    image: '/bonuses/image 632.png',
    title: 'Leroy Merlin',
    description: 'Скидка 20 000 рублей',
  },
]

function Bonuses() {
  function showBonuses() {
    return testBonuses.map((b) => {
      return (
        <CarouselSlide
          key={b.id}
          className='min-h-[260px] w-[320px] rounded-b-[20px] rounded-tl-[20px] border border-base-400 px-[20px] pb-[20px] pt-[72px]'
        >
          <Img
            src={b.image}
            width={244}
            height={137}
            className='ml-auto mr-auto h-[85px] w-[152px] object-cover object-center'
          />
          <div className='mt-auto'>
            <div>{b.title}</div>
            <div>{b.description}</div>
          </div>
        </CarouselSlide>
      )
    })
  }

  return (
    <Section>
      <Carousel>
        <div className='text-header-200 mb-[40px] uppercase'>Бонусы от партнеров</div>
        <CarouselInner>{showBonuses()}</CarouselInner>
      </Carousel>
    </Section>
  )
}

export default Bonuses
