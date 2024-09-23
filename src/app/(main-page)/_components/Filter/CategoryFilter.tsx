'use client'
import React from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import { useCategoryObjects } from '@/features/catalog/useCategoryObject'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { getObjects } from '@/globals/api/methods/catalog/getObjects'
import { useCategorySort } from '@/features/catalog/useCategorySort'

interface CategoryFilterProps {
  filterInputs: FilterType<FilterView>[]
  categoryName: string
}

function CategoryFilter({ filterInputs, categoryName }: CategoryFilterProps) {
  const { filter } = useCategoryFilter()
  const { sort } = useCategorySort()

  const { list } = useCategoryObjects({
    initList: [],
    getObjects: async () => await getObjects(filter, sort, categoryName),
  })

  return (
    <div>
      <FilterItems filters={filterInputs} isQuick />
    </div>
  )
}

export default CategoryFilter
