'use client'
import React, { useContext, useEffect, useState } from 'react'
import { QuickFilters } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import Button from '@/ui/buttons/Button'
import { objectPlural } from '@/features/utility/pluralRules'
import { useFilter } from '@/features/useFilter'
import { ROUTES } from '@/globals/paths'
import { useSearchParams } from 'next/navigation'
import { getCategory, getFilters, getQuickFilters } from '@/globals/api'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
import { PopupContext } from '@/features/Popup'
import { CategoryDealType } from '@/types/RequestProps'
import { EMPTY_FILTERS } from '@/globals/filters'

interface CategoryFilterProps {
  categoryName: string
  dealType: CategoryDealType
}

interface ObjectList {
  objects: unknown[]
  total: number
}

function CategoryFilter({ categoryName, dealType }: CategoryFilterProps) {
  const [filterInputs, setFilterInputs] = useState<QuickFilters>(EMPTY_FILTERS)
  const [list, setList] = useState<ObjectList>({ objects: [], total: 0 })
  const { clearFilters, filter } = useFilter()
  const searchParams = useSearchParams()
  const { updateProps } = useContext(PopupContext)

  useEffect(() => {
    if (filter.str) clearFilters()
  }, [categoryName])

  async function getFiltersAction() {
    const res = await getFilters(categoryName)
    return res.filters
  }

  useEffect(() => {
    getQuickFilters(categoryName).then((res) => setFilterInputs(res))

    getCategory(categoryName, { filter: filter.parsed, dealType }).then((res) => {
      setList({
        objects: res.objects,
        total: res.total,
      })
      updateProps('filter', {
        count: res.total,
      })
    })
  }, [categoryName, dealType, filter])

  const categoryLink = `${ROUTES.CATALOG}/${categoryName}/?${searchParams.toString()}`
  const mapLink = `${ROUTES.MAP}/${categoryName}/?${searchParams.toString()}`

  return (
    <div className='relative mt-[22px]'>
      <DetailFilterButton
        getFilters={getFiltersAction}
        quickFilters={filterInputs}
        initCount={list.total}
        text='Расширенный фильтр'
      />
      <div className='flex justify-between'>
        <FilterItems filters={filterInputs.filters} isQuick />
        <Button
          href={categoryLink}
          type='button'
          size='small'
          variation='primary'
          text={`Показать ${list.total} ${objectPlural.get(list.total)}`}
        />
        <Button
          href={mapLink}
          type='button'
          size='small'
          variation='second'
          text='показать на карте'
          icon={{ img: 'SHOW_MAP' }}
        />
      </div>
    </div>
  )
}

export default CategoryFilter
