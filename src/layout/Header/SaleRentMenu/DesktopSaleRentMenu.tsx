import React from 'react'
import { IsDesktop } from '@/features/adaptive'
import Link from 'next/link'
import Image from 'next/image'
import { suggestionPlural } from '@/features/pluralRules'
import { getCatalogMenu, MenuType } from '@/globals/api'
import { generateCategoryLink } from '@/features/link'

interface Props {
  className: string
  category: MenuType
}

async function DesktopSaleRentMenu({ className, category }: Props) {
  const data = await getCatalogMenu(category)
  const fullAmount = data.reduce((inc, item) => inc + item.total, 0)
  const title = category === 'sale' ? 'Покупка' : 'Аренда'

  function showCategories() {
    return data.map((item) => {
      return (
        <li key={item.id}>
          <Link
            className='flex items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px] md:gap-[20px] md:bg-transparent md:p-[10px] md:transition-colors md:hover:bg-base-100'
            href={generateCategoryLink(item)}
          >
            {item.iconUrl ? (
              <Image
                src={item.iconUrl}
                alt=''
                width={86}
                height={86}
                className='size-[86px] object-cover object-center'
              />
            ) : (
              <div className='size-[86px] rounded-[24px] bg-primary'></div>
            )}
            <div className='w-[140px]'>
              <div className='text-base-300-reg-100-upper mb-[6px] text-base-600'>{item.name}</div>
              <div className='text-base-400-lg-100 text-base-650'>{`${item.total} ${suggestionPlural.get(item.total)}`}</div>
            </div>
          </Link>
        </li>
      )
    })
  }

  return (
    <>
      <IsDesktop>
        <div
          className={`px-container fixed inset-x-0 top-[115px] z-[15] hidden w-full gap-[16px] bg-base-100 pb-[56px] pt-[32px] ${className}`}
        >
          <div className='w-[908px] rounded-[32px] bg-base-300 p-[40px]'>
            <span className='text-header-300 text-base-600'>{`${title} — `}</span>
            <span className='text-header-300 text-base-650'>{`${fullAmount} ${suggestionPlural.get(fullAmount)}`}</span>
            <ul className='ml-[-10px] mt-[40px] grid auto-rows-max grid-cols-3 gap-x-[12px] gap-y-[13px] transition-opacity'>
              <li>
                <Link
                  className='flex items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px] md:gap-[20px] md:bg-transparent md:p-[10px] md:transition-colors md:hover:bg-base-100'
                  href=''
                >
                  <div className='flex size-[86px] items-center justify-center rounded-[24px] bg-primary after:block after:size-[32px] after:bg-icon-more-houses after:bg-default-contain'></div>
                  <div>
                    <div className='text-base-300-reg-100-upper mb-[6px] text-base-600'>смотреть все</div>
                    <div className='text-base-400-lg-100 text-base-650'>{`${fullAmount} ${suggestionPlural.get(fullAmount)}`}</div>
                  </div>
                </Link>
              </li>

              {showCategories()}
            </ul>
          </div>
          <div className='w-full max-w-[644px]'></div>
        </div>
      </IsDesktop>
    </>
  )
}

export default DesktopSaleRentMenu
