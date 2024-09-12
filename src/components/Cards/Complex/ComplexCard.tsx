import React from 'react'

import { ComplexCard as ComplexCardType } from '@/types/Complex'
import ComplexListCard from '@/components/Cards/Complex/ComplexListCard'
import { ComplexTileCard } from '@/components/Cards/Complex/ComplexTileCard'

interface Props {
  item: ComplexCardType
  view?: 'tile' | 'list'
}

function ComplexCard({ item, view = 'tile' }: Props) {
  if (view === 'list') {
    return <ComplexListCard item={item} />
  }

  return <ComplexTileCard item={item} />
}

export default ComplexCard
