'use client'
import React, { useContext } from 'react'
import { LayoutContext } from '@/page-components/gk-detailed/LayoutChoice/LayoutListContext'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'

function LayoutCard() {
  const { activeObject } = useContext(LayoutContext)

  function showCard() {
    // @ts-ignore
    return <ObjectCard item={activeObject} />
  }

  return (
    activeObject && (
      <div className='sticky h-fit w-full rounded-[32px] border border-base-400 p-[24px] md:max-w-[380px]'>
        {showCard()}
      </div>
    )
  )
}

export default LayoutCard
