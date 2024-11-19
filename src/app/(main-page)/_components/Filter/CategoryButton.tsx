import React from 'react'
import Img from '@/ui/Img'
import Link from 'next/link'
import { ROUTES } from '@/globals/paths'

export interface CategoryButtonProps {
  name: string
  seoUrl: string
  icon: string | null
  isActive: boolean
  onClick: (categoryName: string) => void
}

function CategoryButton({ name, seoUrl, icon, isActive, onClick }: CategoryButtonProps) {
  return (
    <>
      <button
        className={`text-base-400-reg-100 hidden w-[168px] flex-col items-center justify-center px-[27px] pb-[18px] pt-[27px] uppercase md:flex ${isActive ? 'rounded-t-[24px] bg-base-100' : 'rounded-t-none text-base-100'}`}
        onClick={() => onClick(seoUrl)}
      >
        <Img
          src={icon}
          height={42}
          width={42}
          className={`mb-[10px] size-[42px] object-contain object-center filter-base-100 md:filter-none ${isActive ? '' : 'md:filter-base-100'}`}
        />
        <span>{name}</span>
      </button>
      <Link
        href={`${ROUTES.CATALOG}/${seoUrl}`}
        className='text-base-400-reg-100 flex size-[132px] flex-col items-center justify-center gap-[10px] rounded-[24px] bg-base-650 text-center uppercase text-base-100 first-of-type:ml-[22px] last-of-type:mr-[22px] md:hidden'
      >
        <Img src={icon} height={42} width={42} className='size-[42px] object-contain object-center filter-base-100' />
        {name}
      </Link>
    </>
  )
}

export default CategoryButton
