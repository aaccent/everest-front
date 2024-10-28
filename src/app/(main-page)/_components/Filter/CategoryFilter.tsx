'use client'
import React, { useEffect, useState } from 'react'
import { QuickFilters } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'
import Button from '@/ui/buttons/Button'
import { objectPlural } from '@/features/utility/pluralRules'
import { useFilter } from '@/features/useFilter'
import { ROUTES } from '@/globals/paths'
import { useSearchParams } from 'next/navigation'
import { getCategory, getQuickFilters } from '@/globals/api'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'

interface CategoryFilterProps {
  categoryName: string
  rent: boolean
}

interface ObjectList {
  objects: unknown[]
  total: number
}

function CategoryFilter({ categoryName, rent }: CategoryFilterProps) {
  const [filterInputs, setFilterInputs] = useState<QuickFilters>({ filters: [], sorts: [] })
  const [list, setList] = useState<ObjectList>({ objects: [], total: 0 })
  const { clearFilters, filter } = useFilter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (filter.str) clearFilters()
  }, [categoryName])

  useEffect(() => {
    getQuickFilters(categoryName).then((res) => setFilterInputs(res))

    getCategory(categoryName, { filter: filter.parsed, rent }).then((res) => {
      setList({
        objects: res.objects,
        total: res.total,
      })
    })
  }, [categoryName, rent, filter])

  const categoryLink = `${ROUTES.CATALOG}/${categoryName}/?${searchParams.toString()}`
  const mapLink = `${ROUTES.MAP}/${categoryName}/?${searchParams.toString()}`

  return (
    <div className='relative mt-[22px]'>
      <DetailFilterButton
        categoryName={categoryName}
        quickFilters={filterInputs}
        text='Расширенный фильтр'
        objectsAmount={list.total}
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
