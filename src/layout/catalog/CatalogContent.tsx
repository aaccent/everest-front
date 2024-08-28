'use client'
import React, { useContext } from 'react'
import { CategoryContext } from '@/layout/catalog/CategoryContext'
import Container from '@/layout/Container'
import { Props as CategoryObjectsHookProps, useCategoryObjects } from '@/features/useCategoryObject'
import { CategoryForGeneratingLink } from '@/features/link'
import { ComplexCard, LayoutObject } from '@/types/Complex'
import { ObjectCard } from '@/types/ObjectCard'

type CatalogContentProps = {
  category: CategoryForGeneratingLink
  tileClassName?: string
  listClassName?: string
} & (
  | ({
      type: 'complex'
    } & CategoryObjectsHookProps<ComplexCard>)
  | ({
      type: 'secondary'
    } & CategoryObjectsHookProps<ObjectCard>)
  | ({
      type: 'layout'
    } & CategoryObjectsHookProps<LayoutObject>)
)

function CatalogContent({ type, category, initList, getObjects, tileClassName, listClassName }: CatalogContentProps) {
  const { list, isLoading } = useCategoryObjects<ObjectCard>({ initList, getObjects })

  const { view } = useContext(CategoryContext)

  const onMoreBtnClick = () => {}

  let viewStyle

  if (view === 'tile') {
    viewStyle = `md:grid md:grid-cols-3 gap-[16px] ${tileClassName}`
  } else {
    viewStyle = `md:gap-[24px] ${listClassName}`
  }

  return (
    <Container>
      <div className={`flex flex-col ${viewStyle}`}>{view === 'tile' ? tileView : listView}</div>
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
