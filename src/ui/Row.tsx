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
  const { setActiveObject, activeObject } = useContext(LayoutContext)

  const activeClass = activeObject?.id === object?.id ? 'active' : ''

  return (
    <tr className={`${className} ${activeClass}`} onClick={() => setActiveObject(object)}>
      {children}
    </tr>
  )
}

export default Row
