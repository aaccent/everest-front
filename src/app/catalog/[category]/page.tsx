import React from 'react'
import { notFound } from 'next/navigation'
import { getCategory } from '@/globals/api'
import Category from '@/app/catalog/_components/Category'
import { CategoryPage } from '@/types/Page'

async function Page({ params }: CategoryPage) {
  const category = await getCategory(params.category).catch(notFound)

  return <Category category={category} />
}

export default Page
