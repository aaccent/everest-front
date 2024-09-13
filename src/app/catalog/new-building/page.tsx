import React from 'react'
import Category from '@/app/catalog/_components/Category'
import { getNewBuildings } from '@/globals/api'

async function Page() {
  const category = await getNewBuildings()

  return <Category category={category} />
}

export default Page
