import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategory } from '@/types/Category'
import { getSecondaryHousing } from '@/globals/api'

interface Props {
  category: AnyCategory
}

function SecondaryCategory({ category }: Props) {
  async function getObjects(filter: object[] | null, sort: string | null) {
    'use server'
    const category = await getSecondaryHousing(filter, sort)
    return category.objects
  }

  return (
    <CategoryLayout category={category}>
      <CatalogContent
        tileClassName='gap-y-[32px] md:gap-y-[56px]'
        type='secondary'
        category={category}
        initList={category.objects}
        getObjects={getObjects}
      />
    </CategoryLayout>
  )
}

export default SecondaryCategory
