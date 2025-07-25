import React from 'react'
import { IsDesktop } from '@/features/adaptive'
import Link from 'next/link'
import Img from '@/ui/Img'
import { suggestionPlural } from '@/features/utility/pluralRules'
import { getSaleRentMenu, MenuType } from '@/globals/api'
import { ROUTES } from '@/globals/paths'
import { getServiceBanner } from '@/globals/api/methods/main-page/getServiceBanner'

interface Props {
  className?: string
  menuType: MenuType
}

async function DesktopSaleRentMenu({ className, menuType }: Props) {
  const data = await getSaleRentMenu(menuType)
  const fullAmount = data.reduce((sum, item) => sum + item.count, 0)
  const title = menuType === 'sale' ? 'Покупка' : 'Аренда'
  const banner = await getServiceBanner()

  function showCategories() {
    return data.map((item) => {
      const link =
        menuType === 'rent'
          ? `${ROUTES.CATALOG_RENT}/${item.type}/${item.seoUrl}`
          : `${ROUTES.CATALOG_SALE}/${item.type}/${item.seoUrl}`

      return (
        <li key={item.id}>
          <Link
            className='flex items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px] md:gap-[20px] md:bg-transparent md:p-[10px] md:transition-colors md:hover:bg-base-100'
            href={link}
          >
            <Img
              src={item.imageUrl}
              width={86}
              height={86}
              className='size-[86px] rounded-[24px] object-cover object-center'
            />
            <div className='w-[140px]'>
              <div className='text-base-300-reg-100-upper mb-[6px] text-base-600'>{item.name}</div>
              <div className='text-base-400-lg-100 text-base-650'>{`${item.count} ${suggestionPlural.get(item.count)}`}</div>
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
          className={`px-container fixed inset-x-0 top-[115px] z-40 hidden h-[580px] w-full gap-[16px] rounded-b-[32px] bg-base-100 pb-[56px] pt-[32px] ${className}`}
          data-menu-type={menuType}
        >
          <div className='flex w-full max-w-[900px] flex-col rounded-[32px] bg-base-300 p-[40px] pb-[30px]'>
            <div>
              <span className='text-header-300 text-base-600'>{`${title} — `}</span>
              <span className='text-header-300 text-base-650'>{`${fullAmount} ${suggestionPlural.get(fullAmount)}`}</span>
            </div>
            <ul className='ml-[-10px] mt-[30px] grid h-1 grow auto-rows-max grid-cols-3 gap-x-[12px] gap-y-[12px] overflow-y-auto transition-opacity scrollbar-custom'>
              {menuType === 'rent' && (
                <li>
                  <Link
                    className='flex items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px] md:gap-[20px] md:bg-transparent md:p-[10px] md:transition-colors md:hover:bg-base-100'
                    href={ROUTES.CATALOG_RENT_BY_DAY}
                  >
                    <Img
                      src='/rent-per-day.png'
                      width={86}
                      height={86}
                      className='size-[86px] rounded-[24px] object-cover object-center'
                    />
                    <div>
                      <div className='text-base-300-reg-100-upper mb-[6px] text-base-600'>Посуточно</div>
                      <div className='text-base-400-lg-100 text-base-650'>{`${0} ${suggestionPlural.get(0)}`}</div>
                    </div>
                  </Link>
                </li>
              )}
              {showCategories()}
            </ul>
          </div>
          <Link href={banner.link} className='hidden w-full max-w-[644px] overflow-hidden rounded-[32px] md:block'>
            <div className='relative flex size-full flex-col justify-between p-[32px]'>
              <Img
                src={banner.image}
                width={644}
                height={492}
                className='absolute inset-0 size-full object-cover object-center'
              />
              <div className='text-header-400 z-10 flex h-[59px] w-[100px] items-center justify-center self-end rounded-[48px] bg-base-100'>
                {banner.tags}
              </div>
              <div className='z-10 text-base-100'>
                <div className='text-header-300 mb-[12px]'>{banner.title}</div>
                <div className='text-base-200-lg-100 max-w-[360px]'>{banner.text}</div>
              </div>
            </div>
          </Link>
        </div>
      </IsDesktop>
    </>
  )
}

export default DesktopSaleRentMenu
