import React from 'react'
import Img from '@/ui/Img'

export interface CategoryButtonProps {
  name: string
  seoUrl: string
  icon: string | null
  isActive: boolean
  onClick: (categoryName: string) => void
}

function CategoryButton({ name, seoUrl, icon, isActive, onClick }: CategoryButtonProps) {
  return (
    <button
      className={`relative flex w-[168px] flex-col items-center gap-[10px] px-[27px] pb-[18px] pt-[27px] after:absolute after:inset-y-1/2 after:right-0 after:block after:h-[30px] after:w-[1px] after:-translate-y-1/2 after:bg-base-100 last:after:bg-transparent ${isActive ? 'rounded-t-[24px] bg-base-100' : 'text-base-100'}`}
      onClick={() => onClick(seoUrl)}
    >
      <Img
        src={icon}
        height={42}
        width={42}
        className={`size-[42px] object-cover object-center ${isActive ? '' : 'filter-base-100'}`}
      />
      <span>{name}</span>
    </button>
  )
}

export default CategoryButton
