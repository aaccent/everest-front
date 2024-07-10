import React from 'react'
import SeeAllCard from '@/layout/Header/components/SeeAllCard'
import MenuItemCard from '@/layout/Header/components/MenuItemCard'
import CatalogMenuButton from './components/CatalogMenuButton'
import MobileCatalogMenuWrapper from './MobileCatalogMenuWrapper'
import CatalogMenuProvider, { CatalogMenuInnerButton, CatalogMenuInnerItem } from './components/CatalogMenuInner'

import { getCatalog } from '@/globals/api'
import { Category } from '@/types/Category'

function outputTopLevel(list: Category[]) {
  return list.map((item) => (
    <li key={item.id}>
      <CatalogMenuInnerButton
        activeClass='bg-primary text-base-100'
        inactiveClass='bg-base-300'
        className='text-base-500-reg-100-upper w-max rounded-[50px] px-[14px] py-[10.5px] text-left transition-colors'
        id={item.id.toString()}
      >
        {item.title}
      </CatalogMenuInnerButton>
    </li>
  ))
}

function outputInnerItems(list: Category[]) {
  return list.map((item) => (
    <CatalogMenuInnerItem
      activeClass='block'
      inactiveClass='hidden'
      className='h-1 flex-grow-[1] overflow-y-auto pb-[24px] scrollbar-transparent'
      id={item.id.toString()}
      key={item.id}
    >
      <ul className='flex flex-col gap-[8px]'>
        <li>
          <SeeAllCard />
        </li>
        {item.subCategories.map((subitem: any) => (
          <MenuItemCard key={subitem.id} {...subitem} />
        ))}
      </ul>
    </CatalogMenuInnerItem>
  ))
}

async function MobileCatalogMenu() {
  const catalog = await getCatalog()

  return (
    <MobileCatalogMenuWrapper className='invisible fixed inset-0 z-30 opacity-0 transition-opacity after:absolute after:inset-x-0 after:top-full after:z-10 after:h-full after:bg-base-100 peer-[.catalog-menu]/style-state:visible peer-[.catalog-menu]/style-state:opacity-100'>
      <div className='px-container absolute inset-x-0 bottom-0 z-10 flex h-full max-h-[90%] flex-col rounded-t-[24px] bg-base-100 pt-[24px]'>
        <div className='relative mb-[40px] flex justify-center'>
          <span className='text-header-300'>Каталог</span>
          <CatalogMenuButton />
        </div>
        <CatalogMenuProvider initId={catalog[0].id.toString()}>
          <ul className='px-container mx-[-20px] mb-[32px] flex gap-[8px] overflow-x-auto scrollbar-transparent'>
            {outputTopLevel(catalog)}
          </ul>
          {outputInnerItems(catalog)}
        </CatalogMenuProvider>
      </div>
    </MobileCatalogMenuWrapper>
  )
}

export default MobileCatalogMenu
