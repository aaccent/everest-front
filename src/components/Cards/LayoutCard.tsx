'use client'
import React, { useContext } from 'react'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'
import { DetailComplex } from '@/types/Complex'
import { LayoutContext } from '@/page-components/complex/LayoutChoice/LayoutListContext'

interface Props {
  complex: DetailComplex
}

function LayoutCard({ complex }: Props) {
  const { activeObject } = useContext(LayoutContext)

  if (!activeObject) return null

  return (
    <div className='sticky h-fit w-full rounded-[32px] border border-base-400 p-[24px] md:max-w-[380px]'>
      <ObjectCard item={activeObject} category={{ breadcrumbs: complex.breadcrumbs.slice(1) }} />
    </div>
  )
}

export default LayoutCard
