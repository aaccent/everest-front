import React from 'react'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { getSecondaryHousing } from '@/globals/api'
import CatalogContent from '@/layout/catalog/CatalogContent'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'
import ObjectFullCard from '@/components/Cards/ObjectCard/ObjectFullCard'
import { viewFunctions } from '@/features/CatalogContext'

async function Page() {
  const category = await getSecondaryHousing()

  return (
    <CategoryLayout category={category}>
      <CatalogContent
        tileClassName='gap-y-[32px] md:gap-y-[56px]'
        {...viewFunctions(category.objects, ObjectCard, ObjectFullCard)}
      />
    </CategoryLayout>
  )
}

export default Page
