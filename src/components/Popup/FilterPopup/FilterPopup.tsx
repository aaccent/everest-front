'use client'
import React, { useEffect, useState } from 'react'
import Container from '@/layout/Container'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import SelectorInline from '@/ui/inputs/SelectorInline'
import Range from '@/ui/inputs/Range'
import Button from '@/ui/buttons/Button'
import Selector from '@/ui/inputs/Selector'
import MobileFilterItem from '@/components/Popup/FilterPopup/MobileFilterItem'
import { getFilters } from '@/globals/api/methods/getFilters'
import { Choice, FiltersType, MinMax, Toggle } from '@/types/FiltersType'

function FilterPopup() {
  const [data, setData] = useState<FiltersType<Choice | MinMax | Toggle>>()
  useEffect(() => {
    getFilters().then(setData)
  }, [])

  return (
    <div className='relative mt-[64px] h-[1200px] rounded-t-[24px] bg-base-100 md:p-[56px]'>
      <Container className='py-[24px] md:py-0'>
        <div className='mb-[33px] flex items-center justify-between md:mb-[56px]'>
          <MapObjectsButton className='md:hidden' />
          <div className='text-header-300 md:text-header-200 md:uppercase'>Фильтры</div>
          <ClosePopupButton />
        </div>
        <div className='*:mb-[18px]'>
          <MobileFilterItem title='Сортировка'>
            <Selector
              values={[
                'по популярности',
                'по дате публикации',
                'сначала дорогие',
                'сначала недорогие',
                'цена за м2, сначала дорогие',
                'цена за м2, сначала недорогие',
              ]}
              isRadio
              title='Сортировать'
            />
          </MobileFilterItem>
          <MobileFilterItem title='Основное'>
            <SelectorInline list={['Студия', '1', '2', '3', '4 +']} className='border border-base-400' />
            <Range min={11} max={127} units='м2' className='border border-base-400' title='площадь' />
            <Range min={0.4} max={17.4} units='млн.₽' className='border border-base-400' title='цена' />
            <Selector
              values={['квартира', 'комната', 'малосемейка', 'общежитие', 'коммуналка', 'со скидкой']}
              title='Тип недвижимости'
            />
          </MobileFilterItem>
        </div>
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
