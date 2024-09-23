import React from 'react'
import Category from '@/app/catalog/_components/Category'
import { getNewBuildingsSubcategory } from '@/globals/api'
import { SubcategoryPage } from '@/types/Page'

async function Page({ params }: SubcategoryPage) {
  const category = await getNewBuildingsSubcategory(params.subcategory)

  return <Category category={category} isSub />
}

export default Page
