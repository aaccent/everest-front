import React from 'react'
import CategoryLayout from '@/layout/CategoryLayout/CategoryLayout'
import CatalogContent from '@/page-components/catalog/CatalogContent'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'
import { getSecondaryHousingSubcategory } from '@/globals/api/methods/getSecondaryHousingSubcategory'

async function Page({ params }: { params: { subcategory: string } }) {
  const category = await getSecondaryHousingSubcategory(params.subcategory)

  function tileView() {
    return category.objects.map((item) => <ObjectCard item={item} key={item.id} />)
  }

  function listView() {
    return category.objects.map((item) => <ObjectCard item={item} key={item.id} />)
  }

  return (
    <CategoryLayout category={category}>
      <CatalogContent
        containerClassName='gap-y-[32px] md:gap-y-[56px] mb-[32px] md:mb-[56px]'
        listView={listView()}
        tileView={tileView()}
      />
    </CategoryLayout>
  )
}

export default Page
