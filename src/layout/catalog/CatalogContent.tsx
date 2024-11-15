'use client'
import React, { useContext } from 'react'
import { CategoryContext } from '@/layout/catalog/CategoryContext'
import Container from '@/layout/Container'
import { CategoryForGeneratingLink } from '@/features/link'
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

function CatalogContent({ tileClassName, listClassName, type }: CatalogContentProps) {
  const { view, list, pagination } = useContext(CategoryContext)

  const onMoreBtnClick = () => {
    pagination.nextPage()
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
          return <ObjectCard item={item as DefaultObject} view={view} />
      }
    })
  }

  return (
    <Container>
      <div className={`flex flex-col ${viewStyle}`}>{showObjects()}</div>
      {pagination.hasNextPage && (
        <Button
          type='button'
          variation='outline'
          size='large'
          className='mt-[40px] w-full rounded-[24px]'
          onClick={onMoreBtnClick}
        >
          показать ещё {pagination.restForShowing} {objectPlural.get(pagination.restForShowing)}
        </Button>
      )}
    </Container>
  )
}

export default CatalogContent
