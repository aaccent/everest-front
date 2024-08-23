import React from 'react'
import { Choice, FilterType, Range, Toggle } from '@/types/FiltersType'
import { showFilterItems } from '@/features/showFilters'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import MobileFilterItem from '@/components/Popup/FilterPopup/MobileFilterItem'

interface FilterBlockProps {
  name: string
  filters: FilterType<Choice | Range | Toggle>[]
}

function FiltersBlock({ name, filters }: FilterBlockProps) {
  return (
    <>
      <IsDesktop>
        <div className=''>
          <div className='text-header-500 mb-[36px] text-base-600'>{name}</div>
          <div className='flex flex-wrap gap-[24px]'>{showFilterItems(filters)}</div>
        </div>
      </IsDesktop>
      <IsMobile>
        <MobileFilterItem filters={filters} name={name} />
      </IsMobile>
    </>
  )
}

export default FiltersBlock
