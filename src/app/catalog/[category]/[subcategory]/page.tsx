import React from 'react'
import { notFound } from 'next/navigation'
import { getCategory } from '@/globals/api'
import Category from '@/app/catalog/_components/Category'
import { CategoryPage, SubcategoryPage } from '@/types/Page'

async function Page(props: SubcategoryPage & CategoryPage) {
  const params = await props.params
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1

  const category = await getCategory(params.category, {
    subcategory: params.subcategory,
    page: page,
    perPage: 9,
  }).catch(notFound)

  return <Category category={category} />
}

export default Page
