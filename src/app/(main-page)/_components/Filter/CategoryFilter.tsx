'use client'
import React, { useEffect, useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import { getObjects } from '@/globals/api/methods/catalog/getObjects'
import { FilterRequestParam, SortRequestParam } from '@/types/Category'
import { GetObjectsFn, useCategoryObjects } from '@/features/catalog/useCategoryObject'
import { getQuickFilters } from '@/globals/api/methods/getFilters'
import Button from '@/ui/buttons/Button'
import { objectPlural } from '@/features/utility/pluralRules'

interface CategoryFilterProps {
  categoryName: string
  rent: boolean
}

function CategoryFilter({ categoryName, rent }: CategoryFilterProps) {
  const _getObjects = async (filter: FilterRequestParam, sort: SortRequestParam) => {
    const category = await getObjects(filter, sort, rent, categoryName)
    return category.objects
  }
  const [params, setParams] = useState<{ initList: unknown[]; getObjects: GetObjectsFn }>({
    initList: [],
    getObjects: _getObjects,
  })

  const [filterInputs, setFilterInputs] = useState<FilterType<FilterView>[]>([])

  const { list } = useCategoryObjects(params)

  useEffect(() => {
    getQuickFilters(categoryName).then((res) => setFilterInputs(res.filters))
    setParams({ initList: list, getObjects: _getObjects })
  }, [categoryName, rent])

  return (
    <div className='flex items-center gap-[12px]'>
      <FilterItems filters={filterInputs} isQuick />
      <Button
        type='button'
        size='small'
        variation='primary'
        text={`Показать ${list.length} ${objectPlural.get(list.length)}`}
      />
      <Button type='button' size='small' variation='second' text='показать на карте' icon={{ img: 'SHOW_MAP' }} />
    </div>
  )
}

export default CategoryFilter
