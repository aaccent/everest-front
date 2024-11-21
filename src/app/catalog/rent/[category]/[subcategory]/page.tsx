import React from 'react'
import { CategoryPage, SubcategoryPage } from '@/types/Page'
import Category from '@/app/catalog/_components/Category'
import { getCategory } from '@/globals/api'
import { notFound } from 'next/navigation'

async function Page({ params }: SubcategoryPage & CategoryPage) {
  const category = await getCategory(params.category, {
    subcategory: params.subcategory,
    page: 1,
    perPage: 9,
    rent: true,
  }).catch(notFound)

  return <Category category={category} />
}

export default Page
