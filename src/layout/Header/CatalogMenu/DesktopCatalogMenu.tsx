import React from 'react'
import { getCatalogMenu, getNewBuildingsBanner } from '@/globals/api'
import CatalogMenuProvider, { CatalogMenuInnerButton, CatalogMenuSubcategories } from './components/CatalogMenuInner'
import Img from '@/ui/Img'
import SeeAllCategoryItem from '@/layout/Header/components/SeeAllCategoryItem'
import MenuItemCard from '@/layout/Header/components/MenuItemCard'
import { MenuCategory } from '@/types/Menu'
import { generateCategoryLink } from '@/features/link'
import GalleryBanner from '@/layout/Header/CatalogMenu/components/GalleryBanner'

function showTopLevel(list: MenuCategory[]) {
  return list.map((category) => (
    <li className='block w-full' key={category.id.toString()}>
      <CatalogMenuInnerButton
        className='text-base-300-lg-100 flex w-full items-center gap-[8px] rounded-[12px] p-[14px] pr-[28px] text-left transition-colors hover:bg-base-100'
        activeClass='bg-base-100'
        id={category.id.toString()}
      >
        <div className='relative size-[20px] flex-shrink-0'>
          <Img className='object-contain object-center' src={category.iconUrl} isDecorative isSVG />
        </div>
        {category.name}
      </CatalogMenuInnerButton>
    </li>
  ))
}

function showSubCategories(list: MenuCategory[]) {
  return list.map((category) => (
    <CatalogMenuSubcategories
      className='auto-rows-max grid-cols-2 gap-x-[12px] gap-y-[13px] p-[30px] pr-[40px] transition-opacity'
      inactiveClass='hidden'
      activeClass='grid'
      key={category.id.toString()}
      id={category.id.toString()}
    >
      <li>
        <SeeAllCategoryItem href={generateCategoryLink(category)} amount={category.total} />
      </li>
      {category.subCategories.map((subcategory) => (
        <li key={subcategory.id}>
          <MenuItemCard parent={category} item={subcategory}></MenuItemCard>
        </li>
      ))}
    </CatalogMenuSubcategories>
  ))
}

async function DesktopCatalogMenu() {
  const catalog = await getCatalogMenu()
  const newBuildingsBanner = await getNewBuildingsBanner()
  const total = catalog.reduce((init, item) => init + item.total, 0)

  return (
    <aside className='px-container invisible fixed inset-x-0 top-0 z-30 flex w-full gap-[16px] rounded-b-[32px] bg-base-100 pb-[56px] pt-[145px] opacity-0 transition-opacity peer-[[data-menu="catalog"]]/header-state:visible peer-[[data-menu="catalog"]]/header-state:opacity-100'>
      <div className='flex h-[540px] w-full flex-col rounded-[32px] bg-base-300'>
        <div className='text-header-300 mx-[40px] border-b border-b-base-600/10 py-[40px]'>
          Каталог — <span className='text-base-600/50'>{`${total} предложений`}</span>
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
      <GalleryBanner list={newBuildingsBanner} />
    </aside>
  )
}

export default DesktopCatalogMenu
