import React from 'react'
import PageTitle, { PageTitleProps } from '@/components/PageTitle/PageTitle'
import Container from '@/layout/Container'
import { suggestionPlural } from '@/features/pluralRules'

interface CatalogPageTitleProps extends PageTitleProps {
  subcategories?: string[]
  amount?: number
}

function CatalogPageTitle(props: CatalogPageTitleProps) {
  function showSubCategories() {
    if (!props.subcategories) return <div>Подкатегории</div>

    return (
      <Container>
        {props.subcategories.map((subcategory, index) => (
          <div key={index}>{subcategory}</div>
        ))}
      </Container>
    )
  }

  return (
    <div className='relative'>
      <PageTitle {...props} />
      <Container className='my-[50px]'>
        {showSubCategories()}
        <div className='text-base-300-lg-100 absolute right-[56px] top-[54px] hidden translate-x-0 text-base-650 md:block'>
          {props.amount ? `Найдено ${props.amount} ${suggestionPlural.get(props.amount)}` : null}
        </div>
      </Container>
    </div>
  )
}

export default CatalogPageTitle
