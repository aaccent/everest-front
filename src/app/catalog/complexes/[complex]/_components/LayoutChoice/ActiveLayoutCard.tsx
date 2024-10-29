'use client'
import React, { useContext } from 'react'
import { LayoutContext } from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutListContext'
import LayoutCard from '@/ui/cards/LayoutCard/LayoutCard'
import { DetailComplex } from '@/types/catalog/Complex'

interface Props {
  complex: DetailComplex
}

function ActiveLayoutCard({ complex }: Props) {
  const { activeObject } = useContext(LayoutContext)

  if (!activeObject) return null

  return (
    <div className='sticky top-[50px] h-fit w-full max-w-[380px]'>
      <LayoutCard item={activeObject} complex={complex} />
    </div>
  )
}

export default ActiveLayoutCard
