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

  return <LayoutCard item={activeObject} complex={complex} />
}

export default ActiveLayoutCard
