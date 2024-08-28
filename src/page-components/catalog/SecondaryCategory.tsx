import React from 'react'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { AnyCategory } from '@/types/Category'

interface Props {
  category: AnyCategory
}

function SecondaryCategory({ category }: Props) {
  return (
    <CategoryLayout category={category}>
      <CatalogContent tileClassName='gap-y-[32px] md:gap-y-[56px]' type='secondary' />
    </CategoryLayout>
  )
}

export default SecondaryCategory
