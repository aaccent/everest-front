'use client'
import React, { useContext } from 'react'
import { CategoryContext } from '@/layout/catalog/CategoryContext'
import Container from '@/layout/Container'
import { CategoryForGeneratingLink } from '@/features/catalog/link'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import { ComplexObject } from '@/types/catalog/Complex'
import ComplexCard from '@/ui/cards/ComplexCard/ComplexCard'
import ObjectCard from '@/ui/cards/ObjectCard/ObjectCard'
import Button from '@/ui/buttons/Button'
import { objectPlural } from '@/features/utility/pluralRules'

type CatalogContentProps = {
  category: CategoryForGeneratingLink
  tileClassName?: string
  listClassName?: string
  type: 'complex' | 'default' | 'layout'
}

function CatalogContent({ category, tileClassName, listClassName, type }: CatalogContentProps) {
  const { view, list, pagination } = useContext(CategoryContext)

  const onMoreBtnClick = () => {
    pagination.setPage((prev) => prev + 1)
  }
  let viewStyle

  if (view === 'tile') {
    viewStyle = `md:grid md:grid-cols-3 gap-[16px] ${tileClassName}`
  } else {
    viewStyle = `md:gap-[24px] ${listClassName}`
  }

  function showObjects() {
    const _list = 'objects' in list ? list.objects : list
    return _list.map((item) => {
      switch (type) {
        case 'complex':
          return <ComplexCard item={item as ComplexObject} view={view} />
        case 'default':
          return <ObjectCard item={item as DefaultObject} category={category} view={view} />
      }
    })
  }

  function showButton() {
    const rest = list.total - list.count * pagination.page
    if (list.count < pagination.perPage || rest <= 0) return null
    const amountOnButton = rest >= pagination.perPage ? pagination.perPage : rest
    return (
      <Button
        type='button'
        variation='outline'
        size='large'
        className='mt-[40px] w-full rounded-[24px]'
        onClick={onMoreBtnClick}
      >{`показать ещё ${amountOnButton} ${objectPlural.get(amountOnButton)}`}</Button>
    )
  }

  return (
    <Container>
      <div className={`flex flex-col ${viewStyle}`}>{showObjects()}</div>
      {showButton()}
    </Container>
  )
}

export default CatalogContent
