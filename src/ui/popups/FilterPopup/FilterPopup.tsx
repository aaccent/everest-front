'use client'
import React, { useContext, useEffect, useState } from 'react'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Button from '@/ui/buttons/Button'
import { getFilters } from '@/globals/api/methods/getFilters'
import { FilterBlock, QuickFilters } from '@/types/FiltersType'
import { IsDesktop, IsMobile } from '@/features/visible/adaptive'
import { FilterItems } from '@/components/FilterItems'
import ResetFiltersButton from '@/components/QuickFilter/ResetFiltersButton'
import FilterBlockWrapper from '@/ui/popups/FilterPopup/FilterBlockWrapper'
import { DynamicPopup, PopupContext } from '@/features/visible/Popup'
import FilterTags from '@/components/FilterTags'
import SortButton from '@/components/QuickFilter/SortButton'
import { CategoryContext } from '@/layout/catalog/CategoryContext'
import { objectPlural } from '@/features/utility/pluralRules'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/globals/paths'

interface Props {
  category: string
  objectsAmount?: number
  quickFilters: QuickFilters
}

function FilterPopup({ category, objectsAmount, quickFilters }: Props) {
  const [filters, setFilters] = useState<FilterBlock[]>([])
  const { amount } = useContext(CategoryContext)
  const { closePopup } = useContext(PopupContext)
  const params = useParams()
  const searchParams = useSearchParams()
  const link = params.toString().includes('catalog') ? '' : `${ROUTES.CATALOG}/${category}/?${searchParams.toString()}`

  useEffect(() => {
    getFilters(category).then((res) => {
      setFilters(res.filters)
    })
  }, [])

  function showFiltersBlocks() {
    return (
      <>
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
        <IsDesktop>
          {filters.map((block) => {
            return (
              <>
                <div className='text-header-500 mb-[36px] text-base-600'>{block.name}</div>
                <div className='mb-[60px] flex flex-wrap gap-[24px] last:mb-0'>
                  <FilterItems filters={block.filters} />
                </div>
              </>
            )
          })}
        </IsDesktop>
      </>
    )
  }

  return (
    <DynamicPopup popupName='filterPopup'>
      <div className='absolute inset-x-0 bottom-0 flex h-[calc(100dvh-64px)] flex-col rounded-[24px] bg-base-100 md:top-[48px] md:block md:h-[(100dvh-48px)] md:p-[56px]'>
        <div className='relative h-1 grow p-[24px] md:static md:h-full md:grow-0 md:p-0'>
          <div className='mb-[33px] flex items-center justify-between md:mb-[56px]'>
            <MapObjectsButton className='md:hidden' />
            <div className='text-header-300 md:text-header-200 md:uppercase'>Фильтры</div>
            <ClosePopupButton />
          </div>

          <FilterTags
            className='hidden md:mb-[64px] md:flex md:w-full md:max-w-[1112px] md:flex-wrap md:items-center md:gap-[10px] md:overflow-auto md:scrollbar-transparent'
            list={filters}
          />

          <div className='flex h-full flex-col overflow-auto pb-[50px] scrollbar-transparent md:block md:w-full md:max-w-[1140px] md:pb-[450px]'>
            {showFiltersBlocks()}
          </div>
        </div>
        <div className='bottom-0 left-0 z-10 flex w-full items-center justify-between bg-base-100 px-[24px] py-[16px] md:fixed md:justify-normal md:px-[56px] md:py-[24px]'>
          <button className='flex size-[50px] items-center justify-center rounded-[16px] bg-base-300 after:block after:size-[22px] after:bg-icon-search-favorite after:bg-default-contain md:hidden' />

          <Link href={link} onClick={closePopup}>
            <Button
              variation='primary'
              size='small'
              text={`Показать ${objectsAmount || amount} ${objectPlural.get(objectsAmount || amount)}`}
              className='md:mr-[12px]'
            />
          </Link>
          <ResetFiltersButton
            text='Сбросить'
            className='rounded-[16px] bg-base-300 px-[28px] py-[12px] transition-colors hover:bg-primary hover:text-base-100'
          />
          <MapObjectsButton className='ml-auto hidden md:order-3 md:flex' />
        </div>
      </div>
    </DynamicPopup>
  )
}

export default FilterPopup
