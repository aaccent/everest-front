'use client'
import React from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { useCategoryFilter } from '@/features/useCategoryFilter'
import MobileFilterItem from '@/components/Popup/FilterPopup/MobileFilterItem'

interface FilterBlockWrapperProps {
  filterBlock: FilterType<FilterView>[]
  name: string
}
function FilterBlockWrapper({ filterBlock, name }: FilterBlockWrapperProps) {
  const { filter } = useCategoryFilter()
  return <MobileFilterItem filters={filterBlock} name={name} />
}

export default FilterBlockWrapper
