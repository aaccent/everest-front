import React from 'react'
import { DetailDefaultObject } from '@/types/catalog/DetailDefaultObject'
import ObjectHero from '@/app/catalog/_components/ObjectDetail/ObjectHero'
import Breadcrumbs from '@/components/Breadcrumbs'
import ObjectProperties from '@/app/catalog/_components/ObjectDetail/ObjectProperties/ObjectProperties'
import SimilarObjects from '@/app/catalog/_components/SimilarObjects'
import { getSimilarObjects } from '@/globals/api'

interface Props {
  item: DetailDefaultObject
  isComplexes?: boolean
}

async function ObjectDetail({ item, isComplexes }: Props) {
  const breadcrumbs = isComplexes ? item.breadcrumbs.slice(1) : item.breadcrumbs
  const objectCode = breadcrumbs.at(-1)?.seo || ''
  const initSimilar = await getSimilarObjects(objectCode, 'price')

  return (
    <>
      <Breadcrumbs className='!mb-[16px] md:mb-[20px]' list={breadcrumbs} />
      <ObjectHero item={item} />
      <ObjectProperties item={item} />
      <SimilarObjects objectCode={objectCode} initList={initSimilar} />
    </>
  )
}

export default ObjectDetail
