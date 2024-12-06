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
import LayoutCard from '@/ui/cards/LayoutCard/LayoutCard'

type CatalogContentProps = {
  category: CategoryForGeneratingLink
  tileClassName?: string
  listClassName?: string
} & (
  | {
      type: 'complex' | 'default'
      complexSeo?: never
    }
  | {
      type: 'layout'
      complexSeo: string
    }
)

function CatalogContent({ tileClassName = '', listClassName = '', type, complexSeo }: CatalogContentProps) {
  const { view, list, pagination } = useContext(CategoryContext)

  const onMoreBtnClick = () => {
    pagination.nextPage()
  }

  const className = view === 'tile' ? [tileClassName] : [listClassName]

  if (view === 'tile') className.push('md:grid')

  switch (type) {
    case 'complex':
      className.push(view === 'tile' ? 'md:grid-cols-3 gap-[16px]' : 'gap-[24px]')
      break
    case 'layout':
      className.push('gap-[16px]')
      className.push(view === 'tile' ? 'md:grid-cols-4' : '')
      break
    case 'default':
      className.push(view === 'tile' ? 'md:grid-cols-3 gap-x-[16px] gap-y-[32px] md:gap-y-[56px]' : 'gap-[24px]')
      break
  }

  function showObjects() {
    const _list = 'objects' in list ? list.objects : list
    return _list.map((item) => {
      switch (type) {
        case 'complex': {
          const _item = item as ComplexObject
          return <ComplexCard item={_item} view={view} key={_item.id} />
        }
        case 'layout':
          const _item = item as DefaultObject
          return <LayoutCard item={_item} view={view} key={_item.id} complexSeo={complexSeo} />
        case 'default': {
          const _item = item as DefaultObject
          return <ObjectCard item={_item} view={view} key={_item.id} />
        }
        default:
          return null
      }
    })
  }

  return (
    <Container>
      <div className={`flex flex-col ${className.join(' ')}`}>{showObjects()}</div>
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
