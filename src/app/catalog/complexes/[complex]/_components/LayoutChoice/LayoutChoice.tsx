import React from 'react'
import Section from '@/layout/Section'
import Container from '@/layout/Container'
import Button from '@/ui/buttons/Button'
import { DetailComplex } from '@/types/catalog/Complex'
import LayoutInner from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutInner'
import LayoutTypes from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutTypes'
import { LayoutContextProvider } from './LayoutListContext'
import ObjectsTable from './ObjectsTable'
import { FilterItems } from '@/components/FilterItems'
import { getComplexQuickFilters } from '@/globals/api'
import ResetFiltersButton from '@/components/QuickFilter/ResetFiltersButton'

interface LayoutChoiceProps {
  complex: DetailComplex
}

async function LayoutChoice({ complex }: LayoutChoiceProps) {
  const quickFilters = await getComplexQuickFilters()

  return (
    <Section>
      <h2 className='text-header-200 mb-[32px] font-coolvetica uppercase'>Выбор планировки</h2>
      <Container className='mb-[40px] hidden justify-between gap-[20px] rounded-[32px] bg-base-200 md:flex md:px-[32px] md:py-[32px]'>
        <div className='flex items-center gap-[24px]'>
          <div className='flex items-center gap-[16px]'>
            <FilterItems filters={quickFilters.filters} isQuick />
          </div>
          <ResetFiltersButton text='сбросить все' />
        </div>
        <Button className='ml-auto' variation='primary' size='small' text='Показать 442 объекта' />
      </Container>
      <LayoutContextProvider>
        <LayoutInner listView={<ObjectsTable complex={complex} />} typeView={<LayoutTypes />} />
      </LayoutContextProvider>
    </Section>
  )
}

export default LayoutChoice
