import React from 'react'
import { getCatalog } from '@/globals/api'
import CatalogMenuProvider, { CatalogMenuInnerButton, CatalogMenuSubcategories } from './components/CatalogMenuInner'
import { Category } from '@/types/Category'
import Img from '@/ui/Img'
import SeeAllCard from '@/layout/Header/components/SeeAllCard'
import MenuItemCard from '@/layout/Header/components/MenuItemCard'

function showTopLevel(list: Category[]) {
  return list.map((category) => (
    <li className='block w-full' key={category.id.toString()}>
      <CatalogMenuInnerButton
        className='text-base-300-lg-100 flex w-full items-center gap-[8px] rounded-[12px] p-[14px] pr-[28px] text-left transition-colors hover:bg-base-100'
        activeClass='bg-base-100'
        id={category.id.toString()}
      >
        <Img className='size-[20px] object-contain object-center' src={category.iconUrl} isDecorative isSVG />
        {category.title}
      </CatalogMenuInnerButton>
    </li>
  ))
}

function showSubCategories(list: Category[]) {
  return list.map((category) => (
    <CatalogMenuSubcategories
      className='auto-rows-max grid-cols-2 gap-x-[12px] gap-y-[13px] p-[30px] pr-[40px] transition-opacity'
      inactiveClass='hidden'
      activeClass='grid'
      key={category.id.toString()}
      id={category.id.toString()}
    >
      <li>
        <SeeAllCard link={category.seoUrl} />
      </li>
      {category.subCategories.map((subcategory) => (
        <li key={subcategory.id}>
          <MenuItemCard {...subcategory}></MenuItemCard>
        </li>
      ))}
    </CatalogMenuSubcategories>
  ))
}

async function DesktopCatalogMenu() {
  const catalog = await getCatalog()

  return (
    <aside className='px-container invisible fixed inset-x-0 top-0 z-10 flex w-full gap-[16px] bg-base-100 pb-[56px] pt-[145px] opacity-0 transition-opacity peer-[.catalog-menu]/style-state:visible peer-[.catalog-menu]/style-state:opacity-100'>
      <div className='flex h-[540px] w-full flex-col rounded-[32px] bg-base-300'>
        <div className='text-header-300 mx-[40px] border-b border-b-base-600/10 py-[40px]'>
          Каталог — <span className='text-base-600/50'>2036 предложений</span>
        </div>
        <nav className='flex h-1 flex-grow pl-[26px] pr-[12px]'>
          <CatalogMenuProvider initId={catalog[0].id.toString()}>
            <ul className='flex min-h-[355px] w-full max-w-[255px] flex-col border-r border-r-base-600/10 pr-[40px] pt-[40px]'>
              {showTopLevel(catalog)}
            </ul>
            <div className='h-full w-full overflow-y-auto scrollbar-custom scroll-btn-yt:h-[40px] scroll-btn-yb:h-[150px]'>
              {showSubCategories(catalog)}
            </div>
          </CatalogMenuProvider>
        </nav>
      </div>
      <div className='w-full max-w-[645px] rounded-[32px]'></div>
    </aside>
  )
}

export default DesktopCatalogMenu
