'use client'
import React, { useEffect, useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import { GetObjectsFn, useCategoryObjects } from '@/features/catalog/useCategoryObject'
import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'
import { getObjects } from '@/globals/api/methods/catalog/getObjects'

interface CategoryFilterProps {
  filterInputs: FilterType<FilterView>[]
  categoryName: string
}

function CategoryFilter({ filterInputs, categoryName }: CategoryFilterProps) {
  const func: GetObjectsFn<ObjectCardType> = async function (filter, sort) {
    const category = await getObjects(filter, sort, categoryName)
    return category.objects
  }
  const [_getObjects, set_getObjects] = useState<GetObjectsFn<unknown>>(func)

  useEffect(() => {
    set_getObjects(func)
  }, [categoryName])

  const { list } = useCategoryObjects({
    initList: [],
    getObjects: _getObjects,
  })

  return (
    <div>
      <FilterItems filters={filterInputs} isQuick />
    </div>
  )
}

export default CategoryFilter
