import React, { PropsWithChildren } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { AnyCategory } from '@/types/catalog/Category'
import PageTitle from '@/ui/text/PageTitle'
import Container from '@/layout/Container'
import QuickFilter from '@/components/QuickFilter/QuickFilter'
import SubCategoryLink from '@/layout/catalog/SubCategoryLink'
import { getFilters, getQuickFilters } from '@/globals/api'
import ObjectsAmount from '@/layout/catalog/ObjectsAmount'
import FilterTagsProvider from '@/components/FilterTagsContext'
import { Filters, QuickFilters } from '@/types/FiltersType'

interface Props extends PropsWithChildren {
  category: AnyCategory
}

export type AllFilters = {
  quick: QuickFilters
  general: Filters
}

export type GetAllFiltersFn = () => Promise<AllFilters>

async function CategoryLayout({ category, children }: Props) {
  const categoryCode = category.breadcrumbs[0].seo
  const generalFilters = await getFilters(categoryCode)

  const getAllFilters = async () => {
    'use server'
    const quick = await getQuickFilters(categoryCode)
    const general = await getFilters(categoryCode)
    return {
      quick,
      general,
    }
  }

  function showSubCategories() {
    if (!category.categories) return null

    return category.categories.map((subcategory) => (
      <li className='block flex-shrink-0' key={subcategory.id}>
        <SubCategoryLink parent={category} item={subcategory} />
      </li>
    ))
  }

  return (
    <>
      <Breadcrumbs category={category} />
      <Container className='mb-[24px] flex items-start justify-between md:mb-[50px]'>
        <PageTitle title={category.name} />
        <ObjectsAmount className='text-base-300-lg-100 hidden translate-x-0 text-base-650 md:block' />
      </Container>
      {!!category.categories?.length && (
        <Container>
          <ul className='-mx-container px-container flex gap-[12px] overflow-x-auto scrollbar-transparent'>
            {showSubCategories()}
          </ul>
        </Container>
      )}
      <FilterTagsProvider list={generalFilters.filters}>
        <QuickFilter getAllFilters={getAllFilters} />
      </FilterTagsProvider>
      {children}
    </>
  )
}

export default CategoryLayout
