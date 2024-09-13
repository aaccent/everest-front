import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategory } from '@/types/Category'
import { getNewBuildings } from '@/globals/api'
import { GetObjectsFn } from '@/features/catalog/useCategoryObject'
import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'

interface Props {
  category: AnyCategory
}

function Category({ category }: Props) {
  const getObjects: GetObjectsFn<ObjectCardType> = async function (filter, sort) {
    'use server'
    const category = await getNewBuildings(filter, sort)
    return category.objects
  }

  return (
    <CategoryLayout category={category}>
      <CatalogContent type='secondary' category={category} getObjects={getObjects} initList={category.objects} />
    </CategoryLayout>
  )
}

export default Category
