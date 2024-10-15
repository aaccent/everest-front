'use client'
import React, { useContext } from 'react'
import { DetailComplex } from '@/types/catalog/Complex'
import { LayoutContext } from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutListContext'

interface Props {
  complex: DetailComplex
}

function LayoutCard({ complex }: Props) {
  const { activeObject } = useContext(LayoutContext)

  if (!activeObject) return null

  // TODO: Карточку планировки
  return <div></div>
}

export default LayoutCard
