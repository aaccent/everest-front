'use client'
import React, { useContext } from 'react'
import { CategoryContext } from '@/layout/catalog/CategoryContext'
import Container from '@/layout/Container'
import { Props as CategoryObjectsHookProps, useCategoryObjects } from '@/features/useCategoryObject'
import { CategoryForGeneratingLink } from '@/features/link'
import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'
import { ComplexCard as ComplexCardType, LayoutObject } from '@/types/Complex'
import ComplexCard from '@/components/Cards/Complex/ComplexCard'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'

type CatalogContentProps = {
  category: CategoryForGeneratingLink
  tileClassName?: string
  listClassName?: string
} & (
  | ({
      type: 'complex'
    } & CategoryObjectsHookProps<ComplexCardType>)
  | ({
      type: 'secondary'
    } & CategoryObjectsHookProps<ObjectCardType>)
  | ({
      type: 'layout'
    } & CategoryObjectsHookProps<LayoutObject>)
)

function CatalogContent({ type, category, initList, getObjects, tileClassName, listClassName }: CatalogContentProps) {
  const { list, isLoading } = useCategoryObjects<unknown>({ initList, getObjects })

  const { view } = useContext(CategoryContext)

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
