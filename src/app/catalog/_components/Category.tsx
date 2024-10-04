import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategoryExceptComplexes } from '@/types/catalog/Category'
import { getCategory } from '@/globals/api'
import { GetObjectsFn } from '@/features/catalog/useCategoryObject'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'

interface Props {
  category: AnyCategoryExceptComplexes
}

function Category({ category }: Props) {
  const getObjects: GetObjectsFn<DefaultObject> = async function (filter, sort) {
    'use server'

    const isSubcategory = 'parent' in category
    const categoryCode = isSubcategory ? category.parent.seoUrl : category.seoUrl

    const data = await getCategory(categoryCode, {
      subcategory: isSubcategory ? category.seoUrl : undefined,
      filter,
      sort,
    })

    return data.objects
  }

  return (
    <CategoryProvider type='default' initList={category.objects} getObjects={getObjects}>
      <CategoryLayout category={category}>
        <CatalogContent tileClassName='gap-y-[32px] md:gap-y-[56px]' type='secondary' category={category} />
      </CategoryLayout>
    </CategoryProvider>
  )
}

export default Category
