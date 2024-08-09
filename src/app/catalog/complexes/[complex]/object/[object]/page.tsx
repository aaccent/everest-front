import React from 'react'
import ObjectDetail from '@/page-components/catalog/ObjectDetail'
import { getObject } from '@/globals/api'
import { ObjectPage } from '@/types/Page'

async function Page({ params }: ObjectPage) {
  const item = await getObject({
    object: params.object,
    category: 'new-building',
    subcategory: 'complexes',
  })

  return <ObjectDetail item={item} isComplexes />
}

export default Page
