import React from 'react'
import { getSecondaryHousing } from '@/globals/api'
import SecondaryCategory from '@/page-components/catalog/SecondaryCategory'

async function Page() {
  const category = await getSecondaryHousing()

  return <SecondaryCategory category={category} />
}

export default Page
