import React from 'react'

import { Tag } from '@/types/Tag'
import { ComplexCard as ComplexCardType } from '@/types/Complex'
import ComplexListCard from '@/components/Cards/Complex/ComplexListCard'
import { ComplexTileCard } from '@/components/Cards/Complex/ComplexTileCard'

export function showTags(tags: Tag[]) {
  return tags.map((tag) => (
    <div
      className='text-base-400-lg-100 flex w-fit items-center justify-center rounded-[10px] bg-base-600 px-[8px] py-[5px] text-base-100 md:px-[12px] md:py-[6.5px]'
      key={tag.id}
    >
      {tag.name}
    </div>
  ))
}

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
