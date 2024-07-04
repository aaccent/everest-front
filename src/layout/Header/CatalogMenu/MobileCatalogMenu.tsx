import React from 'react'
import SeeAllCard from '@/layout/Header/components/SeeAllCard'
import MenuItemCard from '@/layout/Header/components/MenuItemCard'
import CatalogMenuButton from './components/CatalogMenuButton'
import MobileCatalogMenuWrapper from './MobileCatalogMenuWrapper'
import CatalogMenuProvider, { CatalogMenuInnerButton, CatalogMenuInnerItem } from './components/CatalogMenuInner'

import { getDetailCatalog } from '@/globals/api'

function outputTopLevel(list: any[]) {
  return list.map((item) => (
    <li key={item.id}>
      <CatalogMenuInnerButton
        activeClass='bg-primary text-base-100'
        inactiveClass='bg-base-300'
        className='py-[10.5px] px-[14px] w-max text-base-500-reg-100-upper rounded-[50px] text-left transition-colors'
        id={item.id}
      >
        {item.title}
      </CatalogMenuInnerButton>
    </li>
  ))
}

function outputInnerItems(list: any[]) {
  return list.map((item) => (
    <CatalogMenuInnerItem
      activeClass='block'
      inactiveClass='hidden'
      className='pb-[24px] h-1 flex-grow-[1] overflow-y-auto scrollbar-transparent'
      id={item.id}
      key={item.id}
    >
      <ul className='flex flex-col gap-[8px]'>
        <li>
          <SeeAllCard />
        </li>
        {item.subcategories.map((subitem: any) => (
          <MenuItemCard key={subitem.id} {...subitem} />
        ))}
      </ul>
    </CatalogMenuInnerItem>
  ))
}

async function MobileCatalogMenu() {
  const detailCatalog = await getDetailCatalog()

  return (
    <MobileCatalogMenuWrapper className='fixed inset-0 z-30 invisible opacity-0 transition-opacity peer-[.catalog-menu]/style-state:visible peer-[.catalog-menu]/style-state:opacity-100 after:absolute after:inset-x-0 after:top-full after:z-10 after:h-full after:bg-base-100'>
      <div className='absolute inset-x-0 bottom-0 z-10 px-[20px] pt-[24px] h-full max-h-[90%] flex flex-col bg-base-100 rounded-t-[24px]'>
        <div className='relative mb-[40px] flex justify-center'>
          <span className='text-header-300'>Каталог</span>
          <CatalogMenuButton />
        </div>
        <CatalogMenuProvider initId={detailCatalog[0].id}>
          <ul className='mb-[32px] mx-[-20px] px-[20px] flex gap-[8px] overflow-x-auto scrollbar-transparent'>
            {outputTopLevel(detailCatalog)}
          </ul>
          {outputInnerItems(detailCatalog)}
        </CatalogMenuProvider>
      </div>
    </MobileCatalogMenuWrapper>
  )
}

export default MobileCatalogMenu
