'use client'

import React from 'react'
import { useCategoryFilter } from '@/features/useCategoryFilter'

interface Props {
  className?: string
}

function ResetFiltersButton({ className }: Props) {
  const { filter, clearFilters } = useCategoryFilter()

  if (!filter.str) return null

  return (
    <button className={`text-base-500-reg-100 text-base-600/50 ${className}`} type='button' onClick={clearFilters}>
      сбросить все
    </button>
  )
}

export default ResetFiltersButton
