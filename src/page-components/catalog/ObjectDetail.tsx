import React from 'react'
import { SecondaryDetailObject } from '@/types/SecondaryDetailObject'
import ObjectHero from '@/components/ObjectHero/ObjectHero'
import Breadcrumbs from '@/components/Breadcrumbs'
import ObjectProperties from '@/components/ObjectProperties/ObjectProperties'

interface Props {
  item: SecondaryDetailObject
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
