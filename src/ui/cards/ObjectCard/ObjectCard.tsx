import React, { PropsWithChildren } from 'react'
import { DefaultObject as ObjectCardType } from '@/types/catalog/DefaultObject'
import ObjectListCard from '@/ui/cards/ObjectCard/ObjectListCard'
import ObjectTileCard from '@/ui/cards/ObjectCard/ObjectTileCard'

function InfoItem({ children }: PropsWithChildren) {
  return <li className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[8px]'>{children}</li>
}

interface Props {
  view?: 'tile' | 'list'
  item: ObjectCardType
}

function ObjectCard({ view = 'tile', item }: Props) {
  if (view === 'list') {
    return <ObjectListCard item={item} />
  }

  return <ObjectTileCard item={item} />
}

export default ObjectCard
