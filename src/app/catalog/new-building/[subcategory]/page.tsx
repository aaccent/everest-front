import React from 'react'
import { SubcategoryPage } from '@/types/SubcategoryPage'
import Category from '@/page-components/catalog/Category'
import { getNewBuildingsSubcategory } from '@/globals/api'

async function Page({ params }: SubcategoryPage) {
  const category = await getNewBuildingsSubcategory(params.subcategory)

  return <Category category={category} />
}

export default Page
