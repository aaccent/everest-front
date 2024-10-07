import React from 'react'
import { getCategory } from '@/globals/api'
import Category from '@/app/catalog/_components/Category'
import { CategoryPage } from '@/types/Page'

async function Page({ params }: CategoryPage) {
  const category = await getCategory(params.category)

  return <Category category={category} />
}

export default Page
