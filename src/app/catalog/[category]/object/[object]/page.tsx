import React from 'react'
import { CategoryPage, ObjectPage } from '@/types/Page'
import { getObject } from '@/globals/api'
import ObjectDetail from '@/app/catalog/_components/ObjectDetail/ObjectDetail'

async function Page({ params }: ObjectPage & CategoryPage) {
  const object = await getObject({
    category: params.category,
    object: params.object,
  })

  return <ObjectDetail item={object} />
}

export default Page
