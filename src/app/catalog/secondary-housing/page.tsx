import React from 'react'
import { getSecondaryHousing } from '@/globals/api'
import SecondaryCategory from '@/app/catalog/_components/SecondaryCategory'

async function Page() {
  const category = await getSecondaryHousing()

  return <SecondaryCategory category={category} />
}

export default Page
