import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategoryExceptComplexes } from '@/types/catalog/Category'
import { getCategory } from '@/globals/api'
import { GetObjectsFn } from '@/features/useFilterAndPagination'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'

interface Props {
  category: AnyCategoryExceptComplexes
}

function Category({ category }: Props) {
  const getObjects: GetObjectsFn<DefaultObject> = async function (props) {
    'use server'

    const isSubcategory = 'parent' in category
    // '?' в category.parent.seoUrl нужен чтобы убрать ошибку.
    // Возникает она скорее всего из-за того, что некст предзагружает страницы.
    const categoryCode = isSubcategory ? category.parent?.seoUrl : category.seoUrl

    const data = await getCategory(categoryCode, {
      subcategory: isSubcategory ? category.seoUrl : undefined,
      ...props,
    })

    return {
      objects: data.objects,
      total: data.total,
      count: data.count,
    }
  }

  return (
    <CategoryProvider type='default' initList={category} getObjects={getObjects}>
      <CategoryLayout category={category}>
        <CatalogContent tileClassName='gap-y-[32px] md:gap-y-[56px]' type='default' category={category} />
      </CategoryLayout>
    </CategoryProvider>
  )
}

export default Category
