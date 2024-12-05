'use client'
import React, { useEffect, useState } from 'react'
import { FilterBlock, QuickFilters } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import Button from '@/ui/buttons/Button'
import { objectPlural } from '@/features/utility/pluralRules'
import { useFilter } from '@/features/useFilter'
import { ROUTES } from '@/globals/paths'
import { useSearchParams } from 'next/navigation'
import { getCategory, getFilters, getQuickFilters } from '@/globals/api'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
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
  const [quickFilters, setQuickFilters] = useState<QuickFilters>(EMPTY_FILTERS)
  const [detailedFiltersInputs, setDetailedFiltersInputs] = useState<FilterBlock[]>([])
  const [list, setList] = useState<ObjectList>({ objects: [], total: 0 })
  const { clearFilters, filter } = useFilter()
  const searchParams = useSearchParams()

  useEffect(() => {
    clearFilters()
  }, [categoryName])

  async function getFiltersAction() {
    const res = await getFilters(categoryName)
    return res.filters
  }

  useEffect(() => {
    getQuickFilters(categoryName).then(setQuickFilters)
    getFiltersAction().then(setDetailedFiltersInputs)

    getCategory(categoryName, { filter: filter.parsed, dealType }).then((res) => {
      setList({
        objects: res.objects,
        total: res.total,
      })
    })
  }, [categoryName, dealType, filter])

  const categoryLink = `${ROUTES.CATALOG}/${categoryName}/?${searchParams.toString()}`
  const mapLink = `${ROUTES.MAP}/${categoryName}/?${searchParams.toString()}`

  return (
    <div className='relative mt-[22px]'>
      <DetailFilterButton
        categoryName={categoryName}
        detailedFiltersInputs={detailedFiltersInputs}
        getFilters={getFiltersAction}
        quickFilters={quickFilters}
        initCount={list.total}
        text='Расширенный фильтр'
        className='text-base-400-lg-100 absolute right-0 top-[-100%] flex items-center gap-[6px] text-primary after:block after:size-[20px] after:bg-icon-detail-filter after:filter-primary after:bg-default-contain'
      />
      <div className='flex gap-[12px]'>
        <FilterItems filters={quickFilters.filters} keyString={categoryName} isQuick />
        <Button
          className='ml-auto w-full max-w-[184px] text-nowrap'
          href={categoryLink}
          type='button'
          size='small'
          variation='primary'
          text={`Показать ${list.total} ${objectPlural.get(list.total)}`}
        />
        <Button
          className='w-full max-w-[193px] text-nowrap'
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
