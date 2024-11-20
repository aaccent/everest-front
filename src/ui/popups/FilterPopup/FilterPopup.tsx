'use client'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Button from '@/ui/buttons/Button'
import { FilterBlock, QuickFilters } from '@/types/FiltersType'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import { FilterItems } from '@/components/FilterItems'
import ResetFiltersButton from '@/components/QuickFilter/ResetFiltersButton'
import FilterBlockWrapper from '@/ui/popups/FilterPopup/FilterBlockWrapper'
import { PopupContext } from '@/features/Popup'
import SortButton from '@/components/QuickFilter/SortButton'
import { objectPlural } from '@/features/utility/pluralRules'
import { FilterTags } from '@/ui/popups/FilterPopup/FilterTags'
import { PopupTemplate } from '@/layout/popups/PopupTemplate'

interface Props {
  count: number
  quickFilters: QuickFilters
  getFilters: () => Promise<FilterBlock[]>
}

function FilterPopup({ count, quickFilters, getFilters }: Props) {
  const [filters, setFilters] = useState<FilterBlock[]>([])
  const { closePopup, updateProps } = useContext(PopupContext)

  useEffect(() => {
    getFilters().then(setFilters)
  }, [getFilters])

  function showFiltersBlocks() {
    return filters.map((block, i) => {
      return (
        <Fragment key={i}>
          <div className='text-header-500 mb-[36px] text-base-600'>{block.name}</div>
          <div className='mb-[60px] flex flex-wrap gap-[24px] last:mb-0'>
            <FilterItems filters={block.filters} />
          </div>
        </Fragment>
      )
    })
  }

  return (
    <PopupTemplate>
      <div className='absolute inset-x-0 bottom-0 flex h-[calc(100dvh-64px)] flex-col rounded-[24px] bg-base-100 md:top-[48px] md:block md:h-[(100dvh-48px)] md:p-[56px]'>
        <div className='relative h-1 grow p-[24px] md:static md:h-full md:grow-0 md:p-0'>
          <div className='mb-[33px] flex items-center justify-between md:mb-[56px]'>
            <MapObjectsButton className='md:hidden' />
            <div className='text-header-300 md:text-header-200 md:uppercase'>Фильтры</div>
            <ClosePopupButton />
          </div>
          <div className='md:h-full md:w-full md:max-w-[1140px] md:overflow-auto md:pb-[350px] md:scrollbar-transparent'>
            <FilterTags />
            <div className='flex h-full flex-col pb-[50px] md:block md:h-fit'>
              <IsMobile>
                <div className='mb-[40px] flex flex-col gap-[18px]'>
                  <FilterItems filters={quickFilters.filters} />
                </div>
                <div className='border-b border-b-base-600/10 pb-[18px]'>
                  <SortButton sorts={quickFilters.sorts} />
                </div>
                {filters.map((block, index) => {
                  return <FilterBlockWrapper filterBlock={block.filters} name={block.name} key={index} />
                })}
              </IsMobile>
              <IsDesktop>{showFiltersBlocks()}</IsDesktop>
            </div>
          </div>
        </div>
        <div className='bottom-0 left-0 z-10 flex w-full items-center justify-between bg-base-100 px-[24px] py-[16px] md:fixed md:justify-normal md:px-[56px] md:py-[24px]'>
          <button className='flex size-[50px] items-center justify-center rounded-[16px] bg-base-300 after:block after:size-[22px] after:bg-icon-search-favorite after:bg-default-contain md:hidden' />

          <Button
            variation='primary'
            size='small'
            text={`Показать ${count} ${objectPlural.get(count)}`}
            className='md:mr-[12px]'
            onClick={closePopup}
          />
          <ResetFiltersButton
            text='Сбросить'
            className='rounded-[16px] bg-base-300 px-[28px] py-[12px] transition-colors hover:bg-primary hover:text-base-100'
          />
          <MapObjectsButton className='ml-auto hidden md:order-3 md:flex' />
        </div>
      </div>
    </PopupTemplate>
  )
}

export default FilterPopup
