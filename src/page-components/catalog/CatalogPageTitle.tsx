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
    <div className={`relative`}>
      <PageTitle {...props} />
      <Container className={`my-[50px]`}>
        {showSubCategories()}
        <div
          className={`text-base-300-lg-100 absolute right-[50%] top-[285px] -translate-x-[50%] text-base-650 md:right-[56px] md:top-[54px] md:translate-x-0`}
        >
          {props.amount ? `Найдено ${props.amount} ${suggestionPlural.get(props.amount)}` : null}
        </div>
      </Container>
    </div>
  )
}

export default CatalogPageTitle
