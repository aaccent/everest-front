import React from 'react'
import { DetailComplex, LayoutObject } from '@/types/catalog/Complex'
import { formatStatusExtended } from '@/features/utility/date'

interface Props {
  item: LayoutObject
  complex: DetailComplex
}

function LayoutTileCard({ item, complex }: Props) {
  const statusFormatted = formatStatusExtended('2024-10-09T12:38:58.374978Z')

  return (
    <div className='rounded-[32px] border border-base-400 p-[24px]'>
      <div>
        <div>
          <span>{complex.name}</span>
          <span></span>
        </div>
        <div>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
    </div>
  )
}

export default LayoutTileCard
