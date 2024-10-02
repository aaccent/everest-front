'use client'
import React, { useState } from 'react'
import CategoryButton, { CategoryButtonProps } from '@/app/(main-page)/_components/Filter/CategoryButton'
import { MenuCategory } from '@/types/Menu'
import CategoryFilter from '@/app/(main-page)/_components/Filter/CategoryFilter'
import TabButtons from '@/components/TabButtons'

function Filters({ categories }: { categories: MenuCategory[] }) {
  const [activeCategory, setActiveCategory] = useState<{
    seoUrl: CategoryButtonProps['seoUrl']
    isRent: boolean
  }>({ seoUrl: 'new-building', isRent: false })

  const onCategoryBtnClickHandle = (category: string) => {
    setActiveCategory({
      seoUrl: category,
      isRent: activeCategory.isRent,
    })
  }

  function showCategoryButtons() {
    return categories.map((c, index) => (
      <CategoryButton
        key={index}
        name={c.name}
        seoUrl={c.seoUrl}
        icon={c.iconUrl}
        onClick={onCategoryBtnClickHandle}
        isActive={c.seoUrl === activeCategory.seoUrl}
      />
    ))
  }

  function onTabButtonClick(value: string) {
    const isRent = value === 'rent'
    return setActiveCategory({
      seoUrl: activeCategory.seoUrl,
      isRent,
    })
  }

  return (
    <div className='absolute inset-x-0 bottom-[20px] overflow-auto scrollbar-transparent md:inset-x-[56px] md:bottom-[56px]'>
      <div className='flex w-fit gap-[8px] overflow-hidden rounded-t-[24px] md:gap-0 md:bg-base-650'>
        {showCategoryButtons()}
      </div>
      <div className='hidden rounded-b-[24px] rounded-tr-[24px] bg-base-100 p-[20px] md:block'>
        <TabButtons
          list={[
            { text: 'Купить', value: 'buy' },
            { text: 'Снять', value: 'rent' },
          ]}
          onChange={onTabButtonClick}
        />
        <CategoryFilter categoryName={activeCategory.seoUrl} rent={activeCategory.isRent} />
      </div>
    </div>
  )
}

export default Filters
