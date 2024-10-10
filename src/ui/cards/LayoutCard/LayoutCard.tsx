import React from 'react'
import { DetailComplex, LayoutObject } from '@/types/catalog/Complex'
import LayoutTileCard from '@/ui/cards/LayoutCard/LayoutTileCard'
import LayoutListCard from '@/ui/cards/LayoutCard/LayoutListCard'

interface Props {
  item: LayoutObject
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
