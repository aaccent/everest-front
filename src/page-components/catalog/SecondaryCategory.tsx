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

function SecondaryCategory({ category }: Props) {
  return (
    <CategoryLayout category={category}>
      <CatalogContent
        tileClassName='gap-y-[32px] md:gap-y-[56px]'
        {...viewFunctions(category.objects, ObjectFullCard, ObjectCard)}
      />
    </CategoryLayout>
  )
}

export default SecondaryCategory
