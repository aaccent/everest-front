import React from 'react'
import { DetailDefaultObject } from '@/types/catalog/DetailDefaultObject'
import ObjectHero from '@/app/catalog/_components/ObjectDetail/ObjectHero'
import Breadcrumbs from '@/components/Breadcrumbs'
import ObjectProperties from '@/app/catalog/_components/ObjectDetail/ObjectProperties/ObjectProperties'

interface Props {
  item: DetailDefaultObject
  isComplexes?: boolean
}

function ObjectDetail({ item, isComplexes }: Props) {
  const breadcrumbs = isComplexes ? item.breadcrumbs.slice(1) : item.breadcrumbs

  return (
    <>
      <Breadcrumbs className='!mb-[16px] md:mb-[20px]' list={breadcrumbs} />
      <ObjectHero item={item} />
      <ObjectProperties item={item} />
    </>
  )
}

export default ObjectDetail
