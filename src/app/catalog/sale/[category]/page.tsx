import React from 'react'
import { CategoryPage } from '@/types/Page'
import Category from '@/app/catalog/_components/Category'
import { getCategory } from '@/globals/api'
import { notFound } from 'next/navigation'

async function Page(props: CategoryPage) {
  const params = await props.params
  const category = await getCategory(params.category, {
    page: 1,
    perPage: 9,
    dealType: 'sale',
  }).catch(notFound)

  return <Category category={category} dealType='sale' />
}

export default Page
