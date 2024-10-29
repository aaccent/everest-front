import React from 'react'
import Link from 'next/link'
import Img from '@/ui/Img'
import { suggestionPlural } from '@/features/utility/pluralRules'
import { generateCategoryLink } from '@/features/link'
import { MenuCategory, MenuSubcategory } from '@/types/Menu'

interface Props {
  item: MenuSubcategory
  parent: MenuCategory
}

function MenuItemCard({ item, parent }: Props) {
  const total = item.count
  return (
    <Link
      className='flex items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px] md:gap-[20px] md:bg-transparent md:p-[10px] md:transition-colors md:hover:bg-base-100'
      href={generateCategoryLink(item, parent)}
    >
      <div className='relative size-[52px] flex-shrink-0 overflow-hidden rounded-[16px] md:size-[86px] md:rounded-[24px]'>
        <Img className='object-cover object-center' src={item.imageUrl} fill />
      </div>
      <div className='flex flex-col gap-[4px]'>
        <span className='text-base-300-reg-100-upper'>{item.name}</span>
        <span className='text-base-400-lg-100 text-base-600/50'>
          {total} {suggestionPlural.get(total)}
        </span>
      </div>
    </Link>
  )
}

export default MenuItemCard
