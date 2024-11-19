import React from 'react'
import Section from '@/layout/Section'
import Container from '@/layout/Container'
import Button from '@/ui/buttons/Button'
import { DetailComplex } from '@/types/catalog/Complex'
import LayoutInner from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutInner'
import LayoutTypes from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutTypes'
import { LayoutContextProvider } from './LayoutListContext'
import ObjectsTable from './ObjectsTable'
import ResetFiltersButton from '@/components/QuickFilter/ResetFiltersButton'
import { FilterItems } from '@/components/FilterItems'
import { getComplexHouseObjects, getQuickFilters } from '@/globals/api'

export const LAYOUT_ID = 'complex-layout'

interface LayoutChoiceProps {
  complex: DetailComplex
}

async function LayoutChoice({ complex }: LayoutChoiceProps) {
  const quickFilters = await getQuickFilters('new-building', complex.id)

  const houses = await Promise.all(
    complex.houseNumbers.map((houseNumber) => {
      return getComplexHouseObjects(complex.seoUrl, houseNumber, { perPage: 9 })
    }),
  )

  return (
    <Section>
      <h2 className='text-header-200 mb-[32px] font-coolvetica uppercase' id={LAYOUT_ID}>
        Выбор планировки
      </h2>
      <Container className='mb-[40px] hidden justify-between gap-[20px] rounded-[32px] bg-base-200 md:flex md:px-[32px] md:py-[32px]'>
        <div className='flex items-center gap-[24px]'>
          <div className='flex items-center gap-[16px]'>
            <FilterItems filters={quickFilters.filters} isQuick />
          </div>
          <ResetFiltersButton
            className='flex items-center gap-[4px] text-base-600/50 after:size-[11px] after:bg-icon-close after:opacity-50 after:bg-default'
            text='сбросить все'
          />
        </div>
        <Button className='ml-auto' variation='primary' size='small' text='Показать 442 объекта' />
      </Container>
      <LayoutContextProvider>
        <LayoutInner
          complex={complex}
          listView={<ObjectsTable complex={complex} houses={houses} />}
          typeView={<LayoutTypes complex={complex} />}
        />
      </LayoutContextProvider>
    </Section>
  )
}

export default LayoutChoice
