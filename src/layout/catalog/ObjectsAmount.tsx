'use client'

import React, { useContext } from 'react'
import { suggestionPlural } from '@/features/utility/pluralRules'
import { CategoryContext } from '@/layout/catalog/CategoryContext'

function ObjectsAmount({ className }: { className: string }) {
  const { amount } = useContext(CategoryContext)
  return (
    <span className={className}>
      Найдено {amount} {suggestionPlural.get(amount)}
    </span>
  )
}

export default ObjectsAmount
