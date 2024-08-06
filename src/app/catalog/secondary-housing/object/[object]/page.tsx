import React from 'react'
import { ObjectPage } from '@/types/Page'
import { getSecondaryObject } from '@/globals/api'
import ObjectDetail from '@/page-components/catalog/ObjectDetail'

async function Page({ params }: ObjectPage) {
  const object = await getSecondaryObject(params.object)

  return <ObjectDetail item={object} />
}

export default Page
