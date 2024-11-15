'use client'

import React, { useState } from 'react'
import Section from '@/layout/Section'
import TabButtons, { TabButtonItem } from '@/components/TabButtons'
import { useParams } from 'next/navigation'
import { QuickFilters } from '@/types/FiltersType'
import { Category, SubcategoryLikeCategory } from '@/types/catalog/Category'
import { GetObjectsFn } from '@/features/useFilterAndPagination'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import Offers from '@/app/realtors/[realtorCode]/_components/Offers'

const REALTOR_STATES: TabButtonItem[] = [
  {
    text: 'Мои предложения',
    value: 'offers',
  },
  {
    text: 'Отзывы',
    value: 'reviews',
  },
  {
    text: 'Видеотзывы',
    value: 'video-reviews',
  },
  {
    text: 'публикации',
    value: 'articles',
  },
]
interface AboutProps {
  propsForOffersState: {
    quickFilters: QuickFilters
    initObjectsList: Category | SubcategoryLikeCategory
    getObjects: GetObjectsFn<DefaultObject>
  }
}
function About({ propsForOffersState }: AboutProps) {
  const [state, setState] = useState(REALTOR_STATES[0].value)
  const { realtorCode } = useParams()

  const onTabButtonClick = (value: string) => setState(value)

  function showContent() {
    switch (state) {
      case 'offers':
        return <Offers {...propsForOffersState} />
    }
  }

  return (
    <Section>
      <div className='flex flex-col gap-[16px] md:flex-row md:items-end md:justify-between md:gap-0'>
        <h2 className='text-header-200 uppercase'>О риелторе</h2>
        <div>
          <TabButtons list={REALTOR_STATES} onChange={onTabButtonClick} />
        </div>
      </div>
      {showContent()}
    </Section>
  )
}

export default About
