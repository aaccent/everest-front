import React from 'react'
import SeeAllCard from '@/layout/Header/components/SeeAllCard'
import MenuItemCard from '@/layout/Header/components/MenuItemCard'
import CatalogMenuButton from './components/CatalogMenuButton'
import MobileCatalogMenuWrapper from './MobileCatalogMenuWrapper'
import CatalogMenuProvider, { CatalogMenuInnerButton, CatalogMenuSubcategories } from './components/CatalogMenuInner'

import { getCatalogMenu } from '@/globals/api'
import { MenuCategory } from '@/types/Menu'
import { generateCategoryLink } from '@/features/link'

function outputTopLevel(list: MenuCategory[]) {
  return list.map((item) => (
    <li key={item.id}>
      <CatalogMenuInnerButton
        activeClass='bg-primary text-base-100'
        inactiveClass='bg-base-300'
        className='text-base-500-reg-100-upper w-max rounded-[50px] px-[14px] py-[10.5px] text-left transition-colors'
        id={item.id.toString()}
      >
        {item.name}
      </CatalogMenuInnerButton>
    </li>
  ))
}

function outputInnerItems(list: MenuCategory[]) {
  return list.map((item) => (
    <CatalogMenuSubcategories
      activeClass='block'
      inactiveClass='hidden'
      className='flex h-1 flex-grow flex-col gap-[8px] overflow-y-auto pb-[24px] scrollbar-transparent'
      id={item.id.toString()}
      key={item.id}
    >
      <li>
        <SeeAllCard link={generateCategoryLink(item)} amount={item.total} />
      </li>
      {item.subCategories.map((subitem: any) => (
        <MenuItemCard key={subitem.id} parent={item} item={subitem} />
      ))}
    </CatalogMenuSubcategories>
  ))
}

async function MobileCatalogMenu() {
  const catalog = await getCatalogMenu()

  return (
    <MobileCatalogMenuWrapper className='invisible fixed inset-0 z-30 opacity-0 transition-opacity after:absolute after:inset-x-0 after:top-full after:z-10 after:h-full after:bg-base-100 peer-[[data-menu="catalog"]]/header-state:visible peer-[[data-menu="catalog"]]/header-state:opacity-100'>
      <div className='px-container absolute inset-x-0 bottom-0 z-10 flex h-full max-h-[90%] flex-col rounded-t-[24px] bg-base-100 pt-[24px]'>
        <div className='relative mb-[40px] flex justify-center'>
          <span className='text-header-300'>Каталог</span>
          <CatalogMenuButton />
        </div>
        <CatalogMenuProvider initId={catalog[0].id.toString()}>
          <ul className='px-container -mx-container mb-[32px] flex gap-[8px] overflow-x-auto scrollbar-transparent'>
            {outputTopLevel(catalog)}
          </ul>
          {outputInnerItems(catalog)}
        </CatalogMenuProvider>
      </div>
    </MobileCatalogMenuWrapper>
  )
}

export default MobileCatalogMenu
