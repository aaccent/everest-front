'use client'
import React, { useContext } from 'react'
import { CategoryContext } from '@/layout/catalog/CategoryContext'
import Container from '@/layout/Container'
import { CategoryForGeneratingLink } from '@/features/catalog/link'
import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'
import { ComplexCard as ComplexCardType } from '@/types/Complex'
import ComplexCard from '@/ui/cards/ComplexCard/ComplexCard'
import ObjectCard from '@/ui/cards/ObjectCard/ObjectCard'

type CatalogContentProps = {
  category: CategoryForGeneratingLink
  tileClassName?: string
  listClassName?: string
  type: string
}

function CatalogContent({ category, tileClassName, listClassName, type }: CatalogContentProps) {
  const { view, list, isLoading } = useContext(CategoryContext)
  const onMoreBtnClick = () => {}
  let viewStyle

  if (view === 'tile') {
    viewStyle = `md:grid md:grid-cols-3 gap-[16px] ${tileClassName}`
  } else {
    viewStyle = `md:gap-[24px] ${listClassName}`
  }

  function showObjects() {
    return list.map((item) => {
      switch (type) {
        case 'complex':
          return <ComplexCard item={item as ComplexCardType} view={view} />
        case 'secondary':
          return <ObjectCard item={item as ObjectCardType} category={category} view={view} />
      }
    })
  }

  return (
    <Container>
      <div className={`flex flex-col ${viewStyle}`}>{showObjects()}</div>
    </Container>
  )
}

export default CatalogContent
