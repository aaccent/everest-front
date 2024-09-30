import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategory } from '@/types/Category'
import { getSecondaryHousing, getSecondaryHousingSubcategory } from '@/globals/api'
import { GetObjectsFn } from '@/features/catalog/useCategoryObject'
import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'

interface Props {
  category: AnyCategory
  isSub?: boolean
}

function SecondaryCategory({ category, isSub }: Props) {
  const getObjects: GetObjectsFn<ObjectCardType> = async function (filter, sort) {
    'use server'
    const data = isSub
      ? await getSecondaryHousingSubcategory(category.seoUrl, filter, sort)
      : await getSecondaryHousing({ filter, sort })
    return data.objects
  }

  return (
    <CategoryProvider type='secondary' initList={category.objects} getObjects={getObjects}>
      <CategoryLayout category={category}>
        <CatalogContent tileClassName='gap-y-[32px] md:gap-y-[56px]' type='secondary' category={category} />
      </CategoryLayout>
    </CategoryProvider>
  )
}

export default SecondaryCategory
