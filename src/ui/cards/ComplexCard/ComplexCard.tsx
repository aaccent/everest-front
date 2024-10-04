import React from 'react'

import { ComplexObject } from '@/types/catalog/Complex'
import ComplexListCard from '@/ui/cards/ComplexCard/ComplexListCard'
import { ComplexTileCard } from '@/ui/cards/ComplexCard/ComplexTileCard'

interface Props {
  item: ComplexObject
  view?: 'tile' | 'list'
}

function ComplexCard({ item, view = 'tile' }: Props) {
  if (view === 'list') {
    return <ComplexListCard item={item} />
  }

  return <ComplexTileCard item={item} />
}

export default ComplexCard
