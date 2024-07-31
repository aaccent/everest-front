import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategory } from '@/types/Category'
import { viewFunctions } from '@/features/viewFunctions'
import ComplexFullCard from '@/components/Cards/Complex/ComplexFullCard'
import ComplexCard from '@/components/Cards/Complex/ComplexCard'

interface Props {
  category: AnyCategory
}

function ComplexesCategory({ category }: Props) {
  return (
    <CategoryLayout category={category}>
      <CatalogContent {...viewFunctions(category.objects, ComplexFullCard, ComplexCard)} />
    </CategoryLayout>
  )
}

export default ComplexesCategory
