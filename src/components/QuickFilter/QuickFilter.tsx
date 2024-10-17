import React from 'react'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
import Container from '@/layout/Container'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import CatalogViewButton from '@/components/QuickFilter/CatalogViewButton'
import { FilterItems } from '@/components/FilterItems'
import SortButton from '@/components/QuickFilter/SortButton'
import ResetFiltersButton from '@/components/QuickFilter/ResetFiltersButton'
import ObjectsAmount from '@/layout/catalog/ObjectsAmount'
import QuickFiltersTags from '@/components/QuickFilter/QuickFiltersTags'
import { GetAllFiltersFn } from '@/layout/catalog/CategoryLayout'

interface Props {
  getAllFilters: GetAllFiltersFn
}

async function QuickFilter({ getAllFilters }: Props) {
  const { quick } = await getAllFilters()

  return (
    <Container>
      <div className='mb-[32px] mt-[40px] flex items-center justify-between rounded-[24px] bg-base-200 p-[20px] md:w-full md:flex-col md:items-start md:justify-start md:p-[32px] md:pb-[18px]'>
        <div className='flex w-full items-center justify-between md:hidden'>
          <DetailFilterButton getAllFilters={getAllFilters} />
          <ObjectsAmount className='text-base-300-lg-100 translate-x-0 text-base-650 md:hidden' />
          <MapObjectsButton />
        </div>
        <div className='hidden w-full items-center border-b border-b-base-600/10 pb-[24px] md:flex'>
          <DetailFilterButton getAllFilters={getAllFilters} />
          <div className='flex gap-[16px]'>
            <FilterItems filters={quick.filters.slice(0, 5)} isQuick />
          </div>
          <ResetFiltersButton
            className='ml-[24px] flex items-center gap-[4px] opacity-50 after:block after:size-[20px] after:bg-icon-close after:bg-default-auto'
            text='Сбросить все'
          />
          <MapObjectsButton className='ml-auto' />
        </div>
        <div className='hidden w-full items-center pt-[17px] md:flex'>
          <SortButton sorts={quick.sorts} />
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
