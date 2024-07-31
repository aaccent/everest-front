import React from 'react'
import { getComplexes } from '@/globals/api'
import ComplexesCategory from '@/page-components/catalog/ComplexesCategory'

async function Page() {
  const data = await getComplexes()

  const _category = {
    ...data,
    name: 'Жилые Комплексы',
  }

  return <ComplexesCategory category={_category} />
}

export default Page
