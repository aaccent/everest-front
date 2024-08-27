'use client'
import React, { useEffect, useState } from 'react'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Button from '@/ui/buttons/Button'
import { usePathname } from 'next/navigation'
import { getFilters } from '@/globals/api/methods/getFilters'
import { FilterBlock } from '@/types/FiltersType'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import MobileFilterItem from '@/components/Popup/FilterPopup/MobileFilterItem'
import { showFilterItems } from '@/features/showFilters'

function FilterPopup() {
  const [filters, setFilters] = useState<FilterBlock[]>()
  const path = usePathname()

  useEffect(() => {
    const pathObjectType = path.match(/[^\/][a-zA-Z0-9_-]+$/g)
    if (pathObjectType?.length) {
      getFilters(pathObjectType[0]).then((res) => setFilters(res.filters))
    }
  }, [])

  function showFiltersBlocks() {
    return filters?.map((block) => (
      <>
        <IsMobile>
          <MobileFilterItem filters={block.filters} name={block.name} />
        </IsMobile>
        <IsDesktop>
          <div className='text-header-500 mb-[36px] text-base-600'>{block.name}</div>
          <div className='flex flex-wrap gap-[24px]'>{showFilterItems(block.filters)}</div>
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

      <div className='fixed bottom-0 left-0 z-10 flex w-full justify-between bg-base-100 px-[24px] py-[16px] md:justify-normal md:border-t md:border-t-base-400 md:px-[56px] md:py-[24px]'>
        <button className='flex size-[50px] items-center justify-center rounded-[16px] bg-base-300 after:block after:size-[22px] after:bg-icon-search-favorite after:bg-default-contain md:hidden' />
        <Button variation='second' size='small' text='Сбросить' className='md:order-2' />
        <Button variation='primary' size='small' text='Показать 27 объектов' className='md:order-1 md:mr-[12px]' />
        {/*{<Tags className={`hidden md:flex`}/>}*/}
        <MapObjectsButton className='ml-auto hidden md:order-3 md:flex' />
      </div>
    </>
  )
}

export default FilterPopup
