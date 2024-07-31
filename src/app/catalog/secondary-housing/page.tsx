import React from 'react'
import CategoryLayout from '@/layout/CategoryLayout/CategoryLayout'
import { getSecondaryHousing } from '@/globals/api'
import CatalogContent from '@/page-components/catalog/CatalogContent'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'
import ObjectFullCard from '@/components/Cards/ObjectCard/ObjectFullCard'

async function Page() {
  const category = await getSecondaryHousing()

  function tileView() {
    return category.objects.map((item) => <ObjectCard item={item} key={item.id} />)
  }

  function listView() {
    return category.objects.map((item) => <ObjectFullCard item={item} key={item.id} />)
  }

  return (
    <CategoryLayout category={category}>
      <CatalogContent tileClassName='gap-y-[32px] md:gap-y-[56px]' listView={listView()} tileView={tileView()} />
    </CategoryLayout>
  )
}

export default Page
