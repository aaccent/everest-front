'use client'
import React, { useContext } from 'react'
import { LayoutObject } from '@/types/catalog/Complex'
import { LayoutContext } from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutListContext'

interface RowProps {
  className?: string
  children?: React.ReactNode
  object?: LayoutObject
}

function Row({ className, children, object }: RowProps) {
  const { setActiveObject } = useContext(LayoutContext)

  return (
    <tr className={className} onClick={() => setActiveObject(object)}>
      {children}
    </tr>
  )
}

export default Row
