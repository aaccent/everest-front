import React from 'react'
import Link from 'next/link'
import Img from '@/ui/Img'
import { suggestionPlural } from '@/features/utility/pluralRules'
import { getSaleRentMenu, MenuType } from '@/globals/api'

interface Props {
  menuType: MenuType
}

async function MobileSaleRentMenu({ menuType }: Props) {
  const data = await getSaleRentMenu(menuType)
  const fullAmount = data.reduce((inc, item) => inc + item.count, 0)

  function showCategories() {
    return data.map((item) => {
      return (
        <li key={item.id}>
          <Link
            className='flex w-full items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px] md:gap-[20px] md:bg-transparent md:p-[10px] md:transition-colors md:hover:bg-base-100'
            href={item.seoUrl}
          >
            <Img
              src={item.imageUrl}
              width={52}
              height={52}
              className='size-[52px] rounded-[16px] object-cover object-center'
            />
            <div>
              <div className='text-base-300-reg-100-upper mb-[6px] text-base-600'>{item.name}</div>
              <div className='text-base-400-lg-100 text-base-650'>{`${item.count} ${suggestionPlural.get(item.count)}`}</div>
            </div>
          </Link>
        </li>
      )
    })
  }

  return (
    <ul className='ml-[-10px] mt-[24px] flex flex-col gap-[8px]'>
      {menuType === 'rent' && (
        <li>
          <Link
            className='flex items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px] md:gap-[20px] md:bg-transparent md:p-[10px] md:transition-colors md:hover:bg-base-100'
            href=''
          >
            <Img src='' width={86} height={86} className='size-[86px] rounded-[24px] object-cover object-center' />
            <div>
              <div className='text-base-300-reg-100-upper mb-[6px] text-base-600'>Посуточно</div>
              <div className='text-base-400-lg-100 text-base-650'>{`${0} ${suggestionPlural.get(0)}`}</div>
            </div>
          </Link>
        </li>
      )}

      {showCategories()}
    </ul>
  )
}

export default MobileSaleRentMenu
