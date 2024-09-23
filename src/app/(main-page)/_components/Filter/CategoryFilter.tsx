'use client'
import React, { useEffect, useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { getQuickFilters } from '@/globals/api/methods/getFilters'
import { FilterItems } from '@/components/FilterItems'

function CategoryFilter({ categoryName }: { categoryName: string }) {
  const [filters, setFilters] = useState<FilterType<FilterView>[]>([])

  useEffect(() => {
    getQuickFilters(categoryName).then((res) => setFilters(res.filters))
  }, [categoryName])

  return (
    <div>
      <FilterItems filters={filters} isQuick />
    </div>
  )
}

export default CategoryFilter
