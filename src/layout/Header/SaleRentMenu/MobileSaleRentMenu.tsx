import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { suggestionPlural } from '@/features/pluralRules'
import { getCatalogMenu, MenuType } from '@/globals/api'

interface Props {
  type: MenuType
}

async function MobileSaleRentMenu({ type }: Props) {
  const data = await getCatalogMenu(type)
  const fullAmount = data.reduce((inc, item) => inc + item.total, 0)

  function showCategories() {
    return data.map((item) => {
      return (
        <li key={item.id}>
          <Link
            className='flex w-full items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px] md:gap-[20px] md:bg-transparent md:p-[10px] md:transition-colors md:hover:bg-base-100'
            href={item.seoUrl}
          >
            {item.iconUrl ? (
              <Image
                src={item.iconUrl}
                alt=''
                width={52}
                height={52}
                className='size-[52px] object-cover object-center'
              />
            ) : (
              <div className='size-[52px] rounded-[16px] bg-primary'></div>
            )}
            <div>
              <div className='text-base-300-reg-100-upper mb-[6px] text-base-600'>{item.name}</div>
              <div className='text-base-400-lg-100 text-base-650'>{`${item.total} ${suggestionPlural.get(item.total)}`}</div>
            </div>
          </Link>
        </li>
      )
    })
  }

  return (
    <ul className='ml-[-10px] mt-[24px] flex flex-col gap-[8px]'>
      <li>
        <Link
          className='flex w-full items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px] md:gap-[20px] md:bg-transparent md:p-[10px] md:transition-colors md:hover:bg-base-100'
          href=''
        >
          <div className='flex size-[52px] items-center justify-center rounded-[16px] bg-primary after:block after:size-[20px] after:bg-icon-more-houses after:bg-default-contain'></div>
          <div>
            <div className='text-base-300-reg-100-upper mb-[6px] text-base-600'>смотреть все</div>
            <div className='text-base-400-lg-100 text-base-650'>{`${fullAmount} ${suggestionPlural.get(fullAmount)}`}</div>
          </div>
        </Link>
      </li>

      {showCategories()}
    </ul>
  )
}

export default MobileSaleRentMenu
