import React, { PropsWithChildren } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { AnyCategory } from '@/types/Category'
import PageTitle from '@/components/PageTitle/PageTitle'
import Container from '@/layout/Container'
import { suggestionPlural } from '@/features/pluralRules'
import QuickFilter from '@/components/QuickFilter/QuickFilter'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'
import SubCategoryLink from '@/components/SubCategoryLink'

interface Props extends PropsWithChildren {
  category: AnyCategory
}

function CategoryLayout({ category, children }: Props) {
  const amount = category.objects.length

  function showSubCategories() {
    if (!category.categories) return null

    return category.categories.map((subcategory) => (
      <li className='block flex-shrink-0' key={subcategory.id}>
        <SubCategoryLink parent={category} item={subcategory} />
      </li>
    ))
  }

  return (
    <CategoryProvider>
      <Breadcrumbs category={category} />
      <Container className='mb-[24px] flex items-start justify-between md:mb-[50px]'>
        <PageTitle title={category.seoTitle || category.name} />
        <span className='text-base-300-lg-100 hidden translate-x-0 text-base-650 md:block'>
          Найдено {amount} {suggestionPlural.get(amount)}
        </span>
      </Container>
      {!!category.categories?.length && (
        <Container>
          <ul className='-mx-container px-container flex gap-[12px] overflow-x-auto scrollbar-transparent'>
            {showSubCategories()}
          </ul>
        </Container>
      )}
      <QuickFilter category={category} />
      {children}
    </CategoryProvider>
  )
}

export default CategoryLayout
