'use client'
import React, { useContext } from 'react'
import { LayoutContext } from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutListContext'
import { ComplexHouseObject } from '@/types/complex/ComplexHouse'

interface RowProps {
  className?: string
  children?: React.ReactNode
  object?: ComplexHouseObject
}

function Row({ className, children, object }: RowProps) {
  const { setActiveObject, activeObject } = useContext(LayoutContext)

  const activeClass = activeObject?.id === object?.id ? 'active' : ''

  function onClickHandler() {
    if (!object) return

    setActiveObject(object)
  }

  return (
    <tr className={`${className} ${activeClass}`} onClick={onClickHandler}>
      {children}
    </tr>
  )
}

export default Row
