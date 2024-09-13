'use client'
import React from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { useCategoryFilter } from '@/features/useCategoryFilter'
import MobileFilterItem from '@/ui/popups/FilterPopup/MobileFilterItem'

interface FilterBlockWrapperProps {
  filterBlock: FilterType<FilterView>[]
  name: string
}

function FilterBlockWrapper({ filterBlock, name }: FilterBlockWrapperProps) {
  const { filter } = useCategoryFilter()

  const activeIdList = filter.parsed.map((f) => f.id)
  const blockIdList = filterBlock.map((f) => f.id)
  const blockActiveIdList = activeIdList.filter((id) => {
    if (blockIdList.includes(id)) return id
  })

  return <MobileFilterItem filters={filterBlock} name={name} count={blockActiveIdList.length} />
}

export default FilterBlockWrapper
