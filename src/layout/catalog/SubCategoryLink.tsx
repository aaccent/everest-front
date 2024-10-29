import React from 'react'
import { AnyCategory, Subcategory } from '@/types/catalog/Category'
import Link from 'next/link'
import { generateCategoryLink } from '@/features/link'
import Img from '@/ui/Img'
import { TEST_ID } from '@/globals/testIds'

interface Props {
  item: Subcategory
  parent: AnyCategory
}

function SubCategoryLink({ item, parent }: Props) {
  return (
    <Link
      className='flex items-center gap-[14px] rounded-[50px] border border-base-400 pr-[18px]'
      data-testid={TEST_ID.SUBCATEGORY}
      href={generateCategoryLink(item, parent)}
    >
      <Img className='block !size-[50px] rounded-full md:!size-[64px]' src='/no-photo.jpg' width={64} height={64} />
      <span className='text-base-500-reg-100-upper'>{item.name}</span>
    </Link>
  )
}

export default SubCategoryLink
