import React from 'react'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
import Container from '@/layout/Container'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import CatalogViewButton from '@/components/QuickFilter/CatalogViewButton'
import { QuickFilters, Sort } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import SortButton from '@/components/QuickFilter/SortButton'
import ResetFiltersButton from '@/components/QuickFilter/ResetFiltersButton'
import ObjectsAmount from '@/layout/catalog/ObjectsAmount'
import QuickFiltersTags from '@/components/QuickFilter/QuickFiltersTags'
import { getFilters } from '@/globals/api'
import { EMPTY_FILTERS } from '@/globals/filters'

interface Props {
  filters: QuickFilters
  categoryName: string
  initCount: number
  sorts: Sort[]
}

function QuickFilter({ filters, categoryName, initCount, sorts }: Props) {
  async function getFiltersAction() {
    'use server'

    if (!categoryName) return EMPTY_FILTERS.filters

    const res = await getFilters(categoryName)
    return res.filters
  }

  return (
    <Container>
      <div className='mb-[32px] mt-[40px] flex items-center justify-between rounded-[24px] bg-base-200 p-[20px] md:w-full md:flex-col md:items-start md:justify-start md:p-[32px] md:pb-[18px]'>
        <div className='flex w-full items-center justify-between md:hidden'>
          <DetailFilterButton quickFilters={filters} getFilters={getFiltersAction} initCount={initCount} />
          <ObjectsAmount className='text-base-300-lg-100 translate-x-0 text-base-650 md:hidden' />
          <MapObjectsButton categoryName={categoryName} />
        </div>
        <div className='hidden w-full items-center border-b border-b-base-600/10 pb-[24px] md:flex'>
          <DetailFilterButton quickFilters={filters} getFilters={getFiltersAction} initCount={initCount} />
          <div className='ml-[16px] flex gap-[16px]'>
            <FilterItems filters={filters.filters.slice(0, 5)} isQuick />
          </div>
          <ResetFiltersButton
            className='ml-[24px] flex items-center gap-[4px] opacity-50 after:block after:size-[20px] after:bg-icon-close after:bg-default-auto'
            text='Сбросить все'
          />
          <MapObjectsButton className='ml-auto' categoryName={categoryName} />
        </div>
        <div className='hidden w-full items-center pt-[17px] md:flex'>
          <SortButton sorts={sorts} />
          <QuickFiltersTags />
          <button
            className='text-base-500-reg-100-upper ml-auto mr-[30px] flex w-full max-w-[155px] items-center gap-[8px] before:size-[22px] before:bg-icon-search-favorite before:bg-default'
            type='button'
          >
            Сохранить поиск
          </button>
          <CatalogViewButton />
        </div>
      </div>
    </Container>
  )
}

export default QuickFilter
