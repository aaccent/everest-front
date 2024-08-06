import React from 'react'
import { ObjectPage, SubcategoryPage } from '@/types/Page'
import { getSecondaryObject } from '@/globals/api'
import ObjectDetail from '@/page-components/catalog/ObjectDetail'

async function Page({ params }: ObjectPage & SubcategoryPage) {
  const object = await getSecondaryObject({
    category: 'secondary-housing',
    subcategory: params.subcategory,
    object: params.object,
  })

  return <ObjectDetail item={object} />
}

export default Page
