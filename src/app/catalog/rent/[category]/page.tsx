import React from 'react'
import { CategoryPage } from '@/types/Page'
import Category from '@/app/catalog/_components/Category'
import { getCategory } from '@/globals/api'
import { notFound } from 'next/navigation'

async function Page({ params }: CategoryPage) {
  const category = await getCategory(params.category, {
    page: 1,
    perPage: 9,
    dealType: 'rent',
  }).catch(notFound)

  return <Category category={category} dealType='rent' />
}

export default Page
