import React, { PropsWithChildren } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { AnyCategory } from '@/types/catalog/Category'
import PageTitle from '@/ui/text/PageTitle'
import Container from '@/layout/Container'
import QuickFilter from '@/components/QuickFilter/QuickFilter'
import SubCategoryLink from '@/layout/catalog/SubCategoryLink'
import { getFilters, getQuickFilters } from '@/globals/api'
import ObjectsAmount from '@/layout/catalog/ObjectsAmount'
import { Filters, QuickFilters } from '@/types/FiltersType'
import { CategoryDealType } from '@/types/RequestProps'

interface Props extends PropsWithChildren {
  category: AnyCategory
  quickFilters?: QuickFilters
  detailFilters?: Filters
  dealType?: CategoryDealType
  /** Подставляется в начале во время формирования ссылок хлебных крошек и подкатегорий */
  urlBase?: string
}

async function CategoryLayout({ category, children, quickFilters, detailFilters, dealType, urlBase }: Props) {
  const _quickFilters = quickFilters || (await getQuickFilters(category.breadcrumbs[0].seo))
  const _detailedFilters = detailFilters || (await getFilters(category.breadcrumbs[0].seo))

  function showSubCategories() {
    if (!category.categories) return null

    return category.categories.map((subcategory) => (
      <li className='block flex-shrink-0' key={subcategory.id}>
        <SubCategoryLink parent={category} item={subcategory} urlBase={urlBase} />
      </li>
    ))
  }

  return (
    <>
      <Breadcrumbs category={category} dealType={dealType} urlBase={urlBase} />
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
      <QuickFilter
        quickFilters={_quickFilters}
        detailedFilters={_detailedFilters}
        categoryName={category.breadcrumbs[0]?.seo}
        initCount={category.total}
        sorts={_detailedFilters.sorts}
      />
      {children}
    </>
  )
}

export default CategoryLayout
