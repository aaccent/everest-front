import React from 'react'
import FilterTagsProvider from '@/components/FilterTagsContext'
import QuickFilter from '@/components/QuickFilter/QuickFilter'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'
import CatalogContent from '@/layout/catalog/CatalogContent'
import { QuickFilters } from '@/types/FiltersType'
import { Category, SubcategoryLikeCategory } from '@/types/catalog/Category'
import { GetObjectsFn } from '@/features/useFilterAndPagination'
import { DefaultObject } from '@/types/catalog/DefaultObject'

interface Props {
  quickFilters: QuickFilters
  initObjectsList: Category | SubcategoryLikeCategory
  getObjects: GetObjectsFn<DefaultObject>
}

function Offers({ quickFilters, initObjectsList, getObjects }: Props) {
  return (
    <>
      <FilterTagsProvider list={quickFilters.filters}>
        <QuickFilter filters={quickFilters} />
      </FilterTagsProvider>
      <CategoryProvider type='default' initList={initObjectsList} getObjects={getObjects}>
        <CatalogContent category={initObjectsList} type='default' />
      </CategoryProvider>
    </>
  )
}

export default Offers
