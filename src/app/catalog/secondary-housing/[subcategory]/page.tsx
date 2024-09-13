import React from 'react'
import { getSecondaryHousingSubcategory } from '@/globals/api'
import SecondaryCategory from '@/app/catalog/_components/SecondaryCategory'
import { SubcategoryPage } from '@/types/Page'

async function Page({ params }: SubcategoryPage) {
  const category = await getSecondaryHousingSubcategory(params.subcategory)
  return <SecondaryCategory category={category} />
}

export default Page
