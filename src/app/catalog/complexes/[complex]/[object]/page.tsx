import React from 'react'
import { notFound } from 'next/navigation'
import ObjectDetail from '@/app/catalog/_components/ObjectDetail/ObjectDetail'
import { getObject } from '@/globals/api'
import { ObjectPage } from '@/types/Page'

async function Page(props: ObjectPage) {
  const params = await props.params
  const item = await getObject({
    object: params.object,
    category: 'new-building',
    subcategory: 'complexes',
  }).catch(notFound)

  return <ObjectDetail item={item} isComplexes />
}

export default Page
