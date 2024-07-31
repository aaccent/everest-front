import React from 'react'
import { getSecondaryHousingSubcategory } from '@/globals/api/methods/getSecondaryHousingSubcategory'
import SecondaryCategory from '@/page-components/catalog/SecondaryCategory'

async function Page({ params }: { params: { subcategory: string } }) {
  const category = await getSecondaryHousingSubcategory(params.subcategory)

  return <SecondaryCategory category={category} />
}

export default Page
