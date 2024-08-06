import React from 'react'
import { SecondaryDetailObject } from '@/types/SecondaryDetailObject'
import ObjectHero from '@/components/ObjectHero/ObjectHero'
import Breadcrumbs from '@/components/Breadcrumbs'
import ObjectProperties from '@/components/ObjectProperties/ObjectProperties'

interface Props {
  item: SecondaryDetailObject
}

function ObjectDetail({ item }: Props) {
  return (
    <>
      <Breadcrumbs className='!mb-[16px] md:mb-[20px]' list={item.breadcrumbs} />
      <ObjectHero item={item} />
      <ObjectProperties item={item} />
    </>
  )
}

export default ObjectDetail
