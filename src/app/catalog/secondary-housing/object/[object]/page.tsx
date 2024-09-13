import React from 'react'
import { ObjectPage } from '@/types/Page'
import { getObject } from '@/globals/api'
import ObjectDetail from '@/app/catalog/_components/ObjectDetail'
import { getSimilarObjects } from '@/globals/api/methods/catalog-details/getSimilarObjects'
import SimilarObjects from '@/app/catalog/_components/SimilarObjects'

async function Page({ params }: ObjectPage) {
  const object = await getObject({
    category: 'secondary-housing',
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
