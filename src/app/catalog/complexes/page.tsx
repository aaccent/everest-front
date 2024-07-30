import React from 'react'
import { getComplexes } from '@/globals/api/methods/getComplexes'
import CatalogContent from '@/page-components/catalog/CatalogContent'
import CategoryLayout from '@/layout/CategoryLayout/CategoryLayout'
import ComplexCard from '@/components/Cards/Complex/ComplexCard'
import ComplexFullCard from '@/components/Cards/Complex/ComplexFullCard'

async function Page() {
  const data = await getComplexes()
  const _list = data.objects

  function tileView() {
    return _list.map((item) => <ComplexCard key={item.id} {...item} />)
  }

  function listView() {
    return _list.map((item) => <ComplexFullCard key={item.id} {...item} />)
  }

  const categoryData = {
    ...data,
    name: 'Жилые Комплексы',
  }

  return (
    <CategoryLayout category={categoryData}>
      <CatalogContent tileView={tileView()} listView={listView()} />
    </CategoryLayout>
  )
}

export default Page
