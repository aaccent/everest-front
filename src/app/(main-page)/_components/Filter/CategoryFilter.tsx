'use client'
import React, { useEffect, useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import { getObjects } from '@/globals/api/methods/catalog/getObjects'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { FilterRequestParam, SortRequestParam } from '@/types/Category'

interface CategoryFilterProps {
  filterInputs: FilterType<FilterView>[]
  categoryName: string
}

function CategoryFilter({ filterInputs, categoryName }: CategoryFilterProps) {
  const _getObjects = async (filter: FilterRequestParam, sort: SortRequestParam) => {
    const category = await getObjects(filter, sort, categoryName)
    return category.objects
  }
  const [initList, setInitList] = useState<unknown[]>([])
  const [objectList, setObjectList] = useState<unknown[]>(initList)

  useEffect(() => {
    _getObjects(null, null).then((res) => setInitList(res))
  }, [categoryName])

  const { filter } = useCategoryFilter()

  // console.log(objectList)

  return (
    <div>
      <FilterItems filters={filterInputs} isQuick />
    </div>
  )
}

export default CategoryFilter
