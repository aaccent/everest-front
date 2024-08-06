import React from 'react'
import { SecondaryDetailObject } from '@/types/SecondaryDetailObject'
import Breadcrumbs from '@/components/Breadcrumbs'

interface Props {
  item: SecondaryDetailObject
}

function ObjectDetail({ item }: Props) {
  return (
    <>
      <Breadcrumbs className='!mb-[16px] md:mb-[20px]' list={item.breadcrumbs} />
    </>
  )
}

export default ObjectDetail
