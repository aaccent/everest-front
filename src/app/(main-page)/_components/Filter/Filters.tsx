'use client'
import React, { useEffect, useState } from 'react'
import { getCatalogMenu } from '@/globals/api'
import CategoryButton, { CategoryButtonProps } from '@/app/(main-page)/_components/Filter/CategoryButton'
import { MenuCategory } from '@/types/Menu'
import CategoryFilter from '@/app/(main-page)/_components/Filter/CategoryFilter'

function Filters() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [activeCategory, setActiveCategory] = useState<{
    seoUrl: CategoryButtonProps['seoUrl']
    isRent: boolean
  }>({ seoUrl: 'new-building', isRent: false })

  useEffect(() => {
    getCatalogMenu().then((res) => {
      setCategories(res)
    })
  }, [])

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

  return (
    <div className='absolute inset-x-[20px] bottom-[20px] md:inset-x-[56px] md:bottom-[56px]'>
      <div className='flex w-fit overflow-hidden rounded-t-[24px] bg-base-650'>{showCategoryButtons()}</div>
      <div className='rounded-b-[24px] rounded-tr-[24px] bg-base-100 p-[20px]'>
        <div className='mb-[22px] flex items-center justify-between'>
          <div className='flex items-center gap-[8px]'>
            <button
              onClick={() =>
                setActiveCategory({
                  seoUrl: activeCategory.seoUrl,
                  isRent: false,
                })
              }
              className={`text-base-500-reg-100-upper rounded-[50px] px-[14px] py-[9px] ${!activeCategory.isRent ? 'bg-primary text-base-100' : 'bg-base-300 text-base-600'}`}
            >
              Купить
            </button>
            <button
              onClick={() =>
                setActiveCategory({
                  seoUrl: activeCategory.seoUrl,
                  isRent: true,
                })
              }
              className={`text-base-500-reg-100-upper rounded-[50px] px-[14px] py-[9px] ${activeCategory.isRent ? 'bg-primary text-base-100' : 'bg-base-300 text-base-600'}`}
            >
              Снять
            </button>
          </div>
          <button
            type='button'
            className='text-base-400-lg-100 flex items-center gap-[6px] text-primary after:block after:size-[20px] after:bg-icon-detail-filter after:filter-primary after:bg-default-contain'
          >
            Расширенный фильтр
          </button>
        </div>
        <CategoryFilter categoryName={activeCategory.seoUrl} rent={activeCategory.isRent} />
      </div>
    </div>
  )
}

export default Filters
