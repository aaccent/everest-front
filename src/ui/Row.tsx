'use client'
import React, { useContext } from 'react'
import { LayoutObject } from '@/types/Complex'
import { LayoutContext } from '@/page-components/complex/LayoutChoice/LayoutListContext'

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
