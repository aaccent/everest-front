import React from 'react'
import { DetailComplex } from '@/types/catalog/Complex'
import LayoutTileCard from '@/ui/cards/LayoutCard/LayoutTileCard'
import LayoutListCard from '@/ui/cards/LayoutCard/LayoutListCard'
import { DefaultObject } from '@/types/catalog/DefaultObject'

interface Props {
  item: DefaultObject
  complex: DetailComplex
  view?: 'tile' | 'list'
}

function LayoutCard({ view, ...props }: Props) {
  if (view === 'list') {
    return <LayoutListCard {...props} />
  }

  return <LayoutTileCard {...props} />
}

export default LayoutCard
