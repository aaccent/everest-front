import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategory } from '@/types/Category'
import { getNewBuildings, getNewBuildingsSubcategory } from '@/globals/api'
import { GetObjectsFn } from '@/features/catalog/useCategoryObject'
import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'

interface Props {
  category: AnyCategory
  isSub?: boolean
}

function Category({ category, isSub }: Props) {
  const getObjects: GetObjectsFn<ObjectCardType> = async function (filter, sort) {
    'use server'
    const data = isSub
      ? await getNewBuildingsSubcategory(category.seoUrl, filter, sort)
      : await getNewBuildings(filter, sort)
    return data.objects
  }

  return (
    <CategoryProvider type='secondary' getObjects={getObjects} initList={category.objects}>
      <CategoryLayout category={category}>
        <CatalogContent type='secondary' category={category} />
      </CategoryLayout>
    </CategoryProvider>
  )
}

export default Category
