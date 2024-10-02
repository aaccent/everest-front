import React from 'react'
import { ObjectPage, SubcategoryPage } from '@/types/Page'
import { getObject, getSimilarObjects } from '@/globals/api'
import ObjectDetail from '@/app/catalog/_components/ObjectDetail/ObjectDetail'
import SimilarObjects from '@/app/catalog/_components/SimilarObjects'

async function Page({ params }: ObjectPage & SubcategoryPage) {
  const object = await getObject({
    category: 'new-building',
    object: params.object,
  })

  const similarByMinArea = await getSimilarObjects(params.object, 'min_area')
  const similarByPrice = await getSimilarObjects(params.object, 'price')

  return (
    <>
      <ObjectDetail item={object} />
      <SimilarObjects props={{ similarByPrice, similarByMinArea }} />
    </>
  )
}

export default Page
