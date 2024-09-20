'use client'

import React, { useEffect, useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { formatTagText } from '@/ui/popups/FilterPopup/PopupFilterTags'
import Checkbox from '@/ui/inputs/Checkbox'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import Button from '@/ui/buttons/Button'

interface FilterTagsSelectorProps {
  list: FilterType<FilterView>[]
}

function FilterTagsSelector({ list }: FilterTagsSelectorProps) {
  const [filterList, setFilterList] = useState<FilterType<FilterView>[]>([])
  const [selectorOpened, setSelectorOpened] = useState<boolean>(false)
  const { removeFilter, clearFilters } = useCategoryFilter()

  useEffect(() => {
    setFilterList(() => {
      return list.slice(3)
    })
  }, [list])

  function _removeFilter(value: string, checked: boolean) {
    removeFilter(Number(value))
  }

  function showHiddenTags() {
    return filterList.map((f) => (
      <Checkbox
        name={f.id.toString()}
        title={f.name}
        value={f.id.toString()}
        checked
        onChange={_removeFilter}
        key={f.id}
      />
    ))
  }

  return (
    <>
      <button
        className={`text-base-400-lg-100 flex items-center justify-between gap-[4px] text-nowrap rounded-[50px] border border-primary py-[7px] pl-[12px] pr-[7px] text-primary after:block after:size-[14px] after:bg-icon-triangle-arrow after:transition-transform after:filter-primary after:bg-default-auto ${selectorOpened ? 'after:-rotate-90' : 'after:rotate-90'}`}
        onMouseEnter={() => setSelectorOpened(true)}
      >{`Еще ${filterList.length} `}</button>
      <div
        className={`absolute left-[78%] top-[40px] z-10 w-full max-w-[295px] rounded-[32px] bg-base-100 py-[20px] pl-[20px] pr-[8px] shadow transition ${selectorOpened ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div className='mb-[24px] flex items-center justify-between'>
          <div className='text-header-400 text-base-600'>Активные теги</div>
          <button
            className='mr-[10px] flex items-center justify-center bg-[#F2F2F2] circle-[36px] after:block after:size-[20px] after:bg-icon-close after:filter-base-600 after:bg-default-auto'
            onClick={() => setSelectorOpened(false)}
          />
        </div>
        <div className='flex h-fit max-h-[272px] w-full flex-col gap-[16px] overflow-y-auto pr-[10px] scrollbar-custom scroll-btn-yb:h-[60px]'>
          {showHiddenTags()}
        </div>
        <div className='ml-[-20px] w-[295px] rounded-b-[32px] border-t border-t-base-400 bg-base-100 px-[20px] pt-[20px]'>
          <Button
            type='button'
            size='medium'
            variation='second'
            text='Сбросить'
            className='w-full'
            onClick={clearFilters}
          />
        </div>
      </div>
    </>
  )
}

function QuickFiltersTags({ list }: { list: FilterType<FilterView>[] }) {
  const [activeFilters, setActiveFilters] = useState<FilterType<FilterView>[]>([])
  const { removeFilter } = useCategoryFilter()

  useEffect(() => {
    setActiveFilters(list)
  }, [list])

  function showFirstTags() {
    const firstTags = activeFilters.slice(0, 3)
    return firstTags.map((f) => {
      return f.value ? (
        <button
          className='text-base-400-lg-100 flex items-center gap-[5px] text-nowrap rounded-[50px] bg-primary px-[12px] py-[6.5px] text-base-100 after:block after:size-[10px] after:bg-icon-close after:filter-base-100 after:bg-default-cover'
          key={f.id}
          onClick={() => removeFilter(f.id)}
        >
          {formatTagText(f)}
        </button>
      ) : null
    })
  }

  return (
    <>
      {showFirstTags()}
      {list.length > 3 && <FilterTagsSelector list={activeFilters} />}
    </>
  )
}

export default QuickFiltersTags
