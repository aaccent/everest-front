import React from 'react'
import { getComplexes } from '@/globals/api'
import CatalogContent from '@/layout/catalog/CatalogContent'
import { viewFunctions } from '@/features/viewFunctions'
import ComplexFullCard from '@/components/Cards/Complex/ComplexFullCard'
import ComplexCard from '@/components/Cards/Complex/ComplexCard'
import CategoryLayout from '@/layout/catalog/CategoryLayout'

async function Page() {
  const data = await getComplexes()

  const _category = {
    ...data,
    name: 'Жилые Комплексы',
  }

  return (
    <CategoryLayout category={_category}>
      <CatalogContent {...viewFunctions(_category, ComplexFullCard, ComplexCard)} />
    </CategoryLayout>
  )
}

export default Page
