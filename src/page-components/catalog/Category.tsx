import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'
import ObjectFullCard from '@/components/Cards/ObjectCard/ObjectFullCard'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategory } from '@/types/Category'
import { viewFunctions } from '@/features/viewFunctions'

interface Props {
  category: AnyCategory
}

function Category({ category }: Props) {
  return (
    <CategoryLayout category={category}>
      <CatalogContent {...viewFunctions(category, ObjectFullCard, ObjectCard)} />
    </CategoryLayout>
  )
}

export default Category
