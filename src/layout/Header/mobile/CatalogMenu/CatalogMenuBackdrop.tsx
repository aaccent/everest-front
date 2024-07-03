'use client'

import React from 'react'
import { useStyleState } from '@/features/styleStates'

interface Props {
  className?: string
}

function CatalogMenuBackdrop({ className }: Props) {
  const { toggleClass } = useStyleState()

  return <div className={className} onClick={() => toggleClass('catalog-menu')} />
}

export default CatalogMenuBackdrop
