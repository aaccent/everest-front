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
import ObjectFullCard from '@/components/Cards/ObjectCard/ObjectFullCard'

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
          return view === 'tile' ? (
            <ObjectCard category={category} item={item as ObjectCardType} />
          ) : (
            <ObjectFullCard item={item as ObjectCardType} category={category} />
          )
      }
    })
  }

  return (
    <Container>
      <div className={`flex flex-col ${viewStyle}`}>{showObjects()}</div>
      <button
        className='text-base-500-reg-100-upper mt-[16px] w-full rounded-[20px] border border-primary py-[18px] text-primary md:mt-[40px] md:py-[31px]'
        onClick={onMoreBtnClick}
      >
        показать ещё 4
      </button>
    </Container>
  )
}

export default CatalogContent
