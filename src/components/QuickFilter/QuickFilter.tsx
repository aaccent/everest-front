import React from 'react'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
import Container from '@/layout/Container'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import CatalogViewButton from '@/components/QuickFilter/CatalogViewButton'
import { flatPlural } from '@/features/pluralRules'
import { QuickFilters } from '@/types/FiltersType'
import { FilterItems } from '@/features/FilterItems'
import SortButton from '@/components/QuickFilter/SortButton'
import ResetFiltersButton from '@/components/QuickFilter/ResetFiltersButton'

interface Props {
  amount: number
  filters: QuickFilters
  categoryName: string
}

function QuickFilter({ amount, filters, categoryName }: Props) {
  return (
    <Container>
      <div className='mb-[32px] mt-[40px] flex items-center justify-between rounded-[24px] bg-base-200 p-[20px] md:w-full md:flex-col md:items-start md:justify-start md:p-[32px] md:pb-[18px]'>
        <div className='flex w-full items-center justify-between md:hidden'>
          <DetailFilterButton category={categoryName} />
          <span className='text-base-300-lg-100 text-base-600/50'>
            Найдено {amount} {flatPlural.get(amount)}
          </span>
          <MapObjectsButton />
        </div>
        <div className='hidden w-full items-center border-b border-b-base-600/10 pb-[24px] md:flex'>
          <DetailFilterButton className='mr-[16px]' category={categoryName} />
          <div className='flex gap-[16px]'>
            <FilterItems filters={filters.filters.slice(0, 5)} isQuick />
          </div>
          <ResetFiltersButton className='ml-[24px]' />
          <MapObjectsButton className='ml-auto' />
        </div>
        <div className='hidden w-full items-center pt-[17px] md:flex'>
          <SortButton sorts={filters.sorts} />
          <button
            className='text-base-500-reg-100-upper ml-auto mr-[30px] flex items-center gap-[8px] before:size-[22px] before:bg-icon-search-favorite before:bg-default'
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
