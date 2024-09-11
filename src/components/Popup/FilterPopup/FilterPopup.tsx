'use client'
import React, { useEffect, useState } from 'react'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Button from '@/ui/buttons/Button'
import { getFilters } from '@/globals/api/methods/getFilters'
import { FilterBlock } from '@/types/FiltersType'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import MobileFilterItem from '@/components/Popup/FilterPopup/MobileFilterItem'
import { FilterItems } from '@/features/FilterItems'
import ResetFiltersButton from '@/components/QuickFilter/ResetFiltersButton'
import { FiltersTags } from '@/components/QuickFilter/FilterTags'

interface Props {
  category: string
}

function FilterPopup({ category }: Props) {
  const [filters, setFilters] = useState<FilterBlock[]>([])

  useEffect(() => {
    getFilters(category).then((res) => {
      setFilters(res.filters)
    })
  }, [])

  function showFiltersBlocks() {
    return filters?.map((block) => (
      <>
        <IsMobile>
          <MobileFilterItem filters={block.filters} name={block.name} />
        </IsMobile>
        <IsDesktop>
          <div className='text-header-500 mb-[36px] text-base-600'>{block.name}</div>
          <div className='flex flex-wrap gap-[24px]'>
            <FilterItems filters={block.filters} />
          </div>
        </IsDesktop>
      </>
    ))
  }

  return (
    <>
      <div className='absolute inset-x-0 top-[64px] min-h-[calc(100svh-64px)] rounded-[24px] bg-base-100 p-[24px] pt-[24px] md:top-[48px] md:min-h-[100svh] md:p-[56px]'>
        <div className='mb-[33px] flex items-center justify-between md:mb-[56px]'>
          <MapObjectsButton className='md:hidden' />
          <div className='text-header-300 md:text-header-200 md:uppercase'>Фильтры</div>
          <ClosePopupButton />
        </div>
        <div className='*:mb-[18px] md:w-full md:max-w-[1140px] md:*:mb-[60px]'>{showFiltersBlocks()}</div>
      </div>

      <div className='fixed bottom-0 left-0 z-10 flex w-full items-center justify-between bg-base-100 px-[24px] py-[16px] md:justify-normal md:border-t md:border-t-base-400 md:px-[56px] md:py-[24px]'>
        <button className='flex size-[50px] items-center justify-center rounded-[16px] bg-base-300 after:block after:size-[22px] after:bg-icon-search-favorite after:bg-default-contain md:hidden' />

        <Button variation='primary' size='small' text='Показать 27 объектов' className='md:mr-[12px]' />
        <ResetFiltersButton
          text='Сбросить фильтры'
          className='rounded-[16px] bg-base-300 px-[28px] py-[12px] transition-colors hover:bg-primary hover:text-base-100'
        />
        <FiltersTags
          className='ml-[176px] mr-[20px] hidden overflow-auto scrollbar-transparent md:flex'
          list={filters}
        />

        <MapObjectsButton className='ml-auto hidden md:order-3 md:flex' />
      </div>
    </>
  )
}

export default FilterPopup
