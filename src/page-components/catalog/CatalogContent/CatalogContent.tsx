'use client'
import React, { useContext } from 'react'
import { ViewContext } from '@/page-components/catalog/CatalogPageFilter_test/ViewContext'
import { Complex } from '@/components/Cards/CardsTypes'
import ComplexCard from '@/components/Cards/ComplexCard/ComplexCard'

type CatalogContentProps = { list: Complex[] } /** или другие типы карточек*/

function CatalogContent(props: CatalogContentProps) {
  const { view } = useContext(ViewContext)
  return view === 'tile' ? props.list.map((card) => <ComplexCard {...card} key={card.id} />) : <>карточки списком</>
}

export default CatalogContent
