'use client'

import React, { useContext } from 'react'
import { suggestionPlural } from '@/features/utility/pluralRules'
import { CategoryContext } from '@/layout/catalog/CategoryContext'

function ObjectsAmount({ className }: { className: string }) {
  const { list } = useContext(CategoryContext)

  return (
    <span className={className}>
      Найдено {list.total} {suggestionPlural.get(list.total)}
    </span>
  )
}

export default ObjectsAmount
