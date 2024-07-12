import React from 'react'
import { getNewInCatalog } from '@/globals/api/methods/getNewInCatalog'
import Section from '@/layout/Section'
import Link from 'next/link'
import Carousel, { CarouselSlide } from '@/components/Carousel/Carousel'
import { getNewBuildingsCategory } from '@/globals/api/methods/getNewBuildingsCategory'
import NewBuildingCard from '@/components/Cards/NewBuildingCard/NewBuildingCard'
import { Default, NewBuilding } from '@/components/Cards/CardsTypes'
import DefaultCard from '@/components/Cards/DefaultCard/DefaultCard'

interface SliderSectionProps {
  type: 'newBuildings' | 'newInCatalog'
}

async function SliderSection(props: SliderSectionProps) {
  let data
  switch (props.type) {
    case 'newInCatalog':
      data = await getNewInCatalog()
      break
    case 'newBuildings':
      data = await getNewBuildingsCategory()
      break
    default:
      data = null
  }

  function showCard(card: NewBuilding | Default) {
    switch (card.type) {
      case 'newBuildings':
        return <NewBuildingCard {...card} />
      case 'newInCatalog':
        return <DefaultCard {...card} />
    }
  }

  if (!data) return null

  return (
    <Section containerClassName={'relative'}>
      <Link href={'#'}>
        <h2 className='text-header-200 mb-[32px] font-coolvetica uppercase'>{data.title}</h2>
      </Link>
      <Carousel align={'start'}>
        {data.objects.map((card) => (
          <CarouselSlide className='min-w-0 max-w-[320px] md:max-w-[512px]' key={card.id}>
            {showCard(card)}
          </CarouselSlide>
        ))}
        {props.type === 'newBuildings' && (
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
        )}
      </Carousel>
    </Section>
  )
}

export default SliderSection
