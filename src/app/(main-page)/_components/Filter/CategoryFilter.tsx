'use client'
import React, { useEffect, useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import { getObjects } from '@/globals/api/methods/catalog/getObjects'
import { FilterRequestParam, SortRequestParam } from '@/types/Category'
import { useCategoryObjects } from '@/features/catalog/useCategoryObject'
import { getQuickFilters } from '@/globals/api/methods/getFilters'
import Button from '@/ui/buttons/Button'
import { objectPlural } from '@/features/utility/pluralRules'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import Link from 'next/link'
import { ROUTES } from '@/globals/paths'
import { useSearchParams } from 'next/navigation'

interface CategoryFilterProps {
  categoryName: string
  rent: boolean
}

function CategoryFilter({ categoryName, rent }: CategoryFilterProps) {
  function getList(_category: string) {
    return async function (filter: FilterRequestParam, sort: SortRequestParam) {
      const category = await getObjects(_category, filter, sort, rent)
      return category.objects
    }
  }

  const [filterInputs, setFilterInputs] = useState<FilterType<FilterView>[]>([])
  const [initList, setInitList] = useState<unknown[]>([])
  const { list } = useCategoryObjects({ initList, getObjects: getList(categoryName) })
  const { clearFilters, filter } = useCategoryFilter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (filter.str) clearFilters()
    getQuickFilters(categoryName).then((res) => setFilterInputs(res.filters))
    const updateList = getList(categoryName)
    updateList(null, null).then((res) => setInitList(res))
  }, [categoryName, rent])

  const link = `${ROUTES.CATALOG}/${categoryName}/?${searchParams.toString()}`

  return (
    <div className='flex items-center gap-[12px]'>
      <FilterItems filters={filterInputs} isQuick />
      <Link href={link}>
        <Button
          type='button'
          size='small'
          variation='primary'
          text={`Показать ${list.length} ${objectPlural.get(list.length)}`}
        />
      </Link>
      <Button type='button' size='small' variation='second' text='показать на карте' icon={{ img: 'SHOW_MAP' }} />
    </div>
  )
}

export default CategoryFilter
