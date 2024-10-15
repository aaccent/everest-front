import React from 'react'
import { getCategory } from '@/globals/api'
import Category from '@/app/catalog/_components/Category'
import { CategoryPage, SubcategoryPage } from '@/types/Page'

async function Page({ params }: SubcategoryPage & CategoryPage) {
  const category = await getCategory(params.category, {
    subcategory: params.subcategory,
  })

  return <Category category={category} />
}

export default Page
