import React from 'react'
import { notFound } from 'next/navigation'
import { CategoryPage, ObjectPage } from '@/types/Page'
import { getObject } from '@/globals/api'
import ObjectDetail from '@/app/catalog/_components/ObjectDetail/ObjectDetail'

async function Page(props: ObjectPage & CategoryPage) {
  const params = await props.params
  const object = await getObject({
    category: params.category,
    object: params.object,
  }).catch(notFound)

  return <ObjectDetail item={object} />
}

export default Page
