import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategory } from '@/types/Category'
import { getNewBuildings } from '@/globals/api'

interface Props {
  category: AnyCategory
}

function Category({ category }: Props) {
  async function getObjects(filter: string | undefined, sort: string | undefined) {
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
