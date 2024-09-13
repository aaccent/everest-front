'use client'

import React from 'react'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'

interface Props {
  className?: string
  text?: string
}

function ResetFiltersButton({ className, text = 'Сбросить' }: Props) {
  const { filter, clearFilters } = useCategoryFilter()

  if (!filter.str) return null

  return (
    <button className={`text-base-500-reg-100-upper ${className}`} type='button' onClick={clearFilters}>
      {text}
    </button>
  )
}

export default ResetFiltersButton
