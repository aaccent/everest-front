import React from 'react'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
import Container from '@/layout/Container'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import CatalogViewButton from '@/components/QuickFilter/CatalogViewButton'
import { Filters, QuickFilters, Sort } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import SortButton from '@/components/QuickFilter/SortButton'
import ResetFiltersButton from '@/components/QuickFilter/ResetFiltersButton'
import ObjectsAmount from '@/layout/catalog/ObjectsAmount'
import QuickFiltersTags from '@/components/QuickFilter/QuickFiltersTags'
import { getFilters } from '@/globals/api'
import { EMPTY_FILTERS } from '@/globals/filters'

interface Props {
  quickFilters: QuickFilters
  detailedFilters: Filters
  categoryName: string
  initCount: number
  sorts: Sort[]
}

function QuickFilter({ quickFilters, detailedFilters, categoryName, initCount, sorts }: Props) {
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
          <DetailFilterButton
            quickFilters={quickFilters}
            detailedFiltersInputs={detailedFilters.filters}
            getFilters={getFiltersAction}
            initCount={initCount}
            categoryName={categoryName}
            className='flex size-[42px] items-center justify-center rounded-[12px] bg-base-100 p-[10px] after:size-[21px] after:bg-icon-filter after:bg-default'
          />
          <ObjectsAmount className='text-base-300-lg-100 translate-x-0 text-base-650 md:hidden' />
          <MapObjectsButton categoryName={categoryName} />
        </div>
        <div className='hidden w-full items-center border-b border-b-base-600/10 pb-[24px] md:flex'>
          <DetailFilterButton
            detailedFiltersInputs={detailedFilters.filters}
            quickFilters={quickFilters}
            getFilters={getFiltersAction}
            initCount={initCount}
            categoryName={categoryName}
            className='flex size-[42px] items-center justify-center rounded-[12px] bg-base-100 p-[10px] after:size-[21px] after:bg-icon-filter after:bg-default'
          />
          <div className='ml-[16px] flex gap-[16px]'>
            <FilterItems filters={quickFilters.filters.slice(0, 5)} isQuick />
          </div>
          <ResetFiltersButton
            className='ml-[24px] flex items-center gap-[4px] opacity-50 after:block after:size-[20px] after:bg-icon-close after:bg-default-auto'
            text='Сбросить все'
          />
          <MapObjectsButton className='ml-auto' categoryName={categoryName} />
        </div>
        <div className='hidden w-full items-center pt-[17px] md:flex'>
          <SortButton sorts={sorts} />
          <QuickFiltersTags detailedFiltersInputs={detailedFilters.filters} />
          <CatalogViewButton />
        </div>
      </div>
    </Container>
  )
}

export default QuickFilter
