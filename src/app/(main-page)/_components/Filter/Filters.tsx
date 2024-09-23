'use client'
import React, { useEffect, useState } from 'react'
import { getCatalogMenu } from '@/globals/api'
import CategoryButton, { CategoryButtonProps } from '@/app/(main-page)/_components/Filter/CategoryButton'
import { MenuCategory } from '@/types/Menu'
import CategoryFilter from '@/app/(main-page)/_components/Filter/CategoryFilter'
import { FilterType, FilterView } from '@/types/FiltersType'
import { getQuickFilters } from '@/globals/api/methods/getFilters'

function Filters() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [activeCategory, setActiveCategory] = useState<{
    seoUrl: CategoryButtonProps['seoUrl']
    isRent: boolean
  }>({ seoUrl: 'new-building', isRent: false })

  const [filterInputs, setFilterInputs] = useState<FilterType<FilterView>[]>([])

  useEffect(() => {
    getQuickFilters(activeCategory.seoUrl).then((res) => setFilterInputs(res.filters))
  }, [activeCategory])

  useEffect(() => {
    getCatalogMenu().then((res) => {
      setCategories(res)
      getQuickFilters(res[0].seoUrl).then((f) => {
        const seoUrl = res[0].seoUrl
        const filterInputs = f.filters
        setActiveCategory({ seoUrl, isRent: false })
      })
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
      <div className='flex w-fit overflow-hidden rounded-[24px] bg-base-650'>{showCategoryButtons()}</div>
      <div>
        <div>
          <div>
            <button
              onClick={() =>
                setActiveCategory({
                  seoUrl: activeCategory.seoUrl,
                  isRent: false,
                })
              }
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
            >
              Снять
            </button>
          </div>
          <div>Расширенный фильтр</div>
        </div>
      </div>
      <CategoryFilter filterInputs={filterInputs} categoryName={activeCategory.seoUrl} />
    </div>
  )
}

export default Filters
