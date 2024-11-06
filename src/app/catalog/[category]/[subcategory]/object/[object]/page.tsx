import React from 'react'
import { notFound } from 'next/navigation'
import { CategoryPage, ObjectPage, SubcategoryPage } from '@/types/Page'
import { getObject } from '@/globals/api'
import ObjectDetail from '@/app/catalog/_components/ObjectDetail/ObjectDetail'

async function Page({ params }: ObjectPage & SubcategoryPage & CategoryPage) {
  const object = await getObject({
    category: params.category,
    subcategory: params.subcategory,
    object: params.object,
  }).catch(notFound)

  return <ObjectDetail item={object} />
}

export default Page
