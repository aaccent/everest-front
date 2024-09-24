'use client'
import React, { useEffect, useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import { getObjects } from '@/globals/api/methods/catalog/getObjects'
import { FilterRequestParam, SortRequestParam } from '@/types/Category'
import { useCategoryObjects } from '@/features/catalog/useCategoryObject'
import { getQuickFilters } from '@/globals/api/methods/getFilters'

interface CategoryFilterProps {
  categoryName: string
}

function CategoryFilter({ categoryName }: CategoryFilterProps) {
  const _getObjects = async (filter: FilterRequestParam, sort: SortRequestParam) => {
    const category = await getObjects(filter, sort, categoryName)
    return category.objects
  }
  const [initList, setInitList] = useState<unknown[]>([])
  const [objectList, setObjectList] = useState<unknown[]>(initList)
  const [filterInputs, setFilterInputs] = useState<FilterType<FilterView>[]>([])
  const { list } = useCategoryObjects({ initList, getObjects: _getObjects })

  useEffect(() => {
    getQuickFilters(categoryName).then((res) => setFilterInputs(res.filters))
    _getObjects(null, null).then((res) => setInitList(res))
    setObjectList(list)
  }, [categoryName])

  return (
    <div>
      <FilterItems filters={filterInputs} isQuick />
    </div>
  )
}

export default CategoryFilter
