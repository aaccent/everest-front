import React from 'react'
import { notFound } from 'next/navigation'
import { getCategory } from '@/globals/api'
import Category from '@/app/catalog/_components/Category'
import { CategoryPage } from '@/types/Page'

async function Page(props: CategoryPage) {
  const params = await props.params
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1

  const category = await getCategory(params.category, {
    page,
    perPage: 9,
  }).catch(notFound)

  return <Category category={category} />
}

export default Page
