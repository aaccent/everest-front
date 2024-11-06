import React from 'react'
import { notFound } from 'next/navigation'
import { getCategory } from '@/globals/api'
import Category from '@/app/catalog/_components/Category'
import { CategoryPage, SubcategoryPage } from '@/types/Page'

async function Page({ params }: SubcategoryPage & CategoryPage) {
  const category = await getCategory(params.category, {
    subcategory: params.subcategory,
    page: 1,
    perPage: 9,
  }).catch(notFound)

  return <Category category={category} />
}

export default Page
