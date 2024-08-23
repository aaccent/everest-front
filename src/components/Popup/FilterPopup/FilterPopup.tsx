'use client'
import React, { useEffect, useState } from 'react'
import Container from '@/layout/Container'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Button from '@/ui/buttons/Button'
import { usePathname } from 'next/navigation'
import { getFilters } from '@/globals/api/methods/getFilters'
import { FilterBlock } from '@/types/FiltersType'
import FiltersBlock from '@/components/Popup/FilterPopup/FiltersBlock'

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
    return filters?.map((block) => <FiltersBlock {...block} key={block.filters[0].id} />)
  }

  return (
    <div className='relative top-[64px] h-auto rounded-t-[24px] bg-base-100 md:top-[48px] md:p-[56px]'>
      <Container className='py-[24px] md:py-0'>
        <div className='mb-[33px] flex items-center justify-between md:mb-[56px]'>
          <MapObjectsButton className='md:hidden' />
          <div className='text-header-300 md:text-header-200 md:uppercase'>Фильтры</div>
          <ClosePopupButton />
        </div>
        <div className='*:mb-[18px] md:w-full md:max-w-[1140px] md:*:mb-[60px]'>{showFiltersBlocks()}</div>
      </Container>
      <div className='fixed bottom-0 left-0 z-10 flex w-full justify-between px-[24px] py-[16px] md:justify-normal md:border-t md:border-t-base-400 md:px-[56px] md:py-[24px]'>
        <button className='flex size-[50px] items-center justify-center rounded-[16px] bg-base-300 after:block after:size-[22px] after:bg-icon-search-favorite after:bg-default-contain md:hidden' />
        <Button variation='second' size='small' text='Сбросить' className='md:order-2' />
        <Button variation='primary' size='small' text='Показать 27 объектов' className='md:order-1 md:mr-[12px]' />
        {/*{<Tags className={`hidden md:flex`}/>}*/}
        <MapObjectsButton className='ml-auto hidden md:order-3 md:flex' />
      </div>
    </div>
  )
}

export default FilterPopup
