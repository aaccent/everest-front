import React from 'react'
import { ObjectPage, SubcategoryPage } from '@/types/Page'
import { getObject } from '@/globals/api'
import ObjectDetail from '@/app/catalog/_components/ObjectDetail'

async function Page({ params }: ObjectPage & SubcategoryPage) {
  const object = await getObject({
    category: 'new-building',
    object: params.object,
  })

  return <ObjectDetail item={object} />
}

export default Page
