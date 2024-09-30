'use client'
import React, { useContext, useEffect, useState } from 'react'
import { QuickFilters } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import { getObjects } from '@/globals/api/methods/catalog/getObjects'
import { FilterRequestParam, SortRequestParam } from '@/types/Category'
import { getQuickFilters } from '@/globals/api/methods/getFilters'
import Button from '@/ui/buttons/Button'
import { objectPlural } from '@/features/utility/pluralRules'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import Link from 'next/link'
import { ROUTES } from '@/globals/paths'
import { useSearchParams } from 'next/navigation'
import FilterPopup from '@/ui/popups/FilterPopup/FilterPopup'
import { PopupContext } from '@/features/visible/Popup'

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

  const [filterInputs, setFilterInputs] = useState<QuickFilters>({ filters: [], sorts: [] })
  const [initList, setInitList] = useState<unknown[]>([])
  const { openDynamicPopup } = useContext(PopupContext)
  const { clearFilters, filter } = useCategoryFilter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (filter.str) clearFilters()
  }, [categoryName])

  useEffect(() => {
    getQuickFilters(categoryName).then((res) => setFilterInputs(res))
    const updateList = getList(categoryName)
    updateList(filter.parsed, null).then((res) => setInitList(res))
  }, [categoryName, rent, filter])

  const link = `${ROUTES.CATALOG}/${categoryName}/?${searchParams.toString()}`

  return (
    <div className='relative mt-[22px]'>
      <button
        type='button'
        className='text-base-400-lg-100 absolute right-0 top-[-100%] flex items-center gap-[6px] text-primary after:block after:size-[20px] after:bg-icon-detail-filter after:filter-primary after:bg-default-contain'
        onClick={() => openDynamicPopup('filterPopup')}
      >
        <FilterPopup category={categoryName} objectsAmount={initList.length} quickFilters={filterInputs} />
        Расширенный фильтр
      </button>
      <div className='flex justify-between'>
        <FilterItems filters={filterInputs.filters} isQuick />
        <Link href={link}>
          <Button
            type='button'
            size='small'
            variation='primary'
            text={`Показать ${initList.length} ${objectPlural.get(initList.length)}`}
          />
        </Link>
        <Button type='button' size='small' variation='second' text='показать на карте' icon={{ img: 'SHOW_MAP' }} />
      </div>
    </div>
  )
}

export default CategoryFilter
