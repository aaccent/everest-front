import React, { PropsWithChildren } from 'react'
import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'
import { CategoryForGeneratingLink } from '@/features/link'
import { LayoutObject } from '@/types/Complex'
import ObjectListCard from '@/components/Cards/ObjectCard/ObjectListCard'
import ObjectTileCard from '@/components/Cards/ObjectCard/ObjectTileCard'

function InfoItem({ children }: PropsWithChildren) {
  return <li className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[8px]'>{children}</li>
}

interface Props {
  view?: 'tile' | 'list'
  item: ObjectCardType | LayoutObject
  category: CategoryForGeneratingLink
}

function ObjectCard({ view = 'tile', item, category }: Props) {
  if (view === 'list') {
    return <ObjectListCard item={item} category={category} />
  }

  return <ObjectTileCard item={item} category={category} />
}

export default ObjectCard
