'use client'
import React, { useEffect, useState } from 'react'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Button from '@/ui/buttons/Button'
import { getFilters } from '@/globals/api/methods/getFilters'
import { FilterBlock, FilterType, FilterView } from '@/types/FiltersType'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import MobileFilterItem from '@/components/Popup/FilterPopup/MobileFilterItem'
import { FilterItems } from '@/features/FilterItems'
import { useCategoryFilter } from '@/features/useCategoryFilter'

function formatTagText(f: FilterType<FilterView>) {
  return f.fieldType === 'range'
    ? `${f.name} : ${f.value.min} - ${f.value.max}`
    : f.fieldType === 'toggle'
      ? `Есть ${f.name}`
      : `${f.name} : ${f.value}`
}

function FiltersTags({ className, list }: FiltersTagsProps) {
  function showTags() {
    return list.map((f) => (
      <button
        className='text-base-400-lg-100 flex items-center gap-[4px] rounded-[50px] bg-primary py-[6.5px] pl-[12px] pr-[7px] text-base-100 after:block after:size-[16px] after:bg-icon-close after:bg-default-contain'
        key={f.id}
      >
        {formatTagText(f)}
      </button>
    ))
  }

  return <div className={className}>{showTags()}</div>
}

interface Props {
  category: string
}

function FilterPopup({ category }: Props) {
  const [filters, setFilters] = useState<FilterBlock[]>()
  const { filter } = useCategoryFilter()
  const [activeFilters, setActiveFilters] = useState<FilterType<FilterView>[]>([])

  function getActiveFilters(filtersGeneral: FilterBlock[]) {
    const allFiltersList = filtersGeneral.map((block) => block.filters).reduce((acc, f) => acc.concat(f), [])

    const activeId = filter.parsed.map((filter) => filter.id)
    const activeFilters = allFiltersList.filter((filter) => activeId.includes(filter.id))
    return activeFilters.map((f) => {
      return {
        id: f.id,
        name: f.name,
        value: filter.parsed.find((item) => item.id === f.id)!.value,
        fieldType: f.fieldType,
      }
    })
  }

  useEffect(() => {
    getFilters(category).then((res) => {
      setFilters(res.filters)
      setActiveFilters(getActiveFilters(res.filters) as FilterType<FilterView>[])
    })
  }, [])

  useEffect(() => {
    //setActiveFilters()
  }, [filter.str])

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

      <div className='fixed bottom-0 left-0 z-10 flex w-full justify-between bg-base-100 px-[24px] py-[16px] md:justify-normal md:border-t md:border-t-base-400 md:px-[56px] md:py-[24px]'>
        <button className='flex size-[50px] items-center justify-center rounded-[16px] bg-base-300 after:block after:size-[22px] after:bg-icon-search-favorite after:bg-default-contain md:hidden' />
        <Button variation='second' size='small' text='Сбросить' className='md:order-2' />
        <Button variation='primary' size='small' text='Показать 27 объектов' className='md:order-1 md:mr-[12px]' />

        <FiltersTags className='order-3 ml-[176px] hidden items-center gap-[10px] md:flex' list={activeFilters} />

        <MapObjectsButton className='ml-auto hidden md:order-3 md:flex' />
      </div>
    </>
  )
}

interface FiltersTagsProps {
  className?: string
  list: FilterType<FilterView>[]
}

export default FilterPopup
