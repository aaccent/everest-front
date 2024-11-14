'use client'

import React, { useState } from 'react'
import Section from '@/layout/Section'
import TabButtons, { TabButtonItem } from '@/components/TabButtons'
import { useParams } from 'next/navigation'
import { QuickFilters } from '@/types/FiltersType'
import QuickFilter from '@/components/QuickFilter/QuickFilter'
import FilterTagsProvider from '@/components/FilterTagsContext'

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
  quickFilters: QuickFilters
}
function About({ quickFilters }: AboutProps) {
  const [state, setState] = useState(REALTOR_STATES[0].value)
  const { realtorCode } = useParams()

  const onTabButtonClick = (value: string) => setState(value)

  function showContent() {}

  return (
    <Section>
      <div className='flex flex-col gap-[16px] md:flex-row md:items-end md:justify-between md:gap-0'>
        <h2 className='text-header-200 uppercase'>О риелторе</h2>
        <div>
          <TabButtons list={REALTOR_STATES} onChange={onTabButtonClick} />
        </div>
      </div>
      <FilterTagsProvider list={quickFilters.filters}>
        <QuickFilter filters={quickFilters} />
      </FilterTagsProvider>
    </Section>
  )
}

export default About
