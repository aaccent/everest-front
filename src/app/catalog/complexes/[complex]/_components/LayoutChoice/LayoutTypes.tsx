import React from 'react'
import { getLayouts } from '@/globals/api'
import { DetailComplex } from '@/types/catalog/Complex'
import LayoutGroupCard from '@/ui/cards/LayoutGroupCard'

interface Props {
  complex: DetailComplex
}

async function LayoutTypes({ complex }: Props) {
  const layouts = await getLayouts(complex.seoUrl)

  function showList() {
    // TODO: Поменять key на item.id, когда добавят
    return layouts.map((item, i) => <LayoutGroupCard complex={complex} item={item} key={i} />)
  }

  return (
    <div className='flex w-full flex-col-reverse gap-[32px] md:flex-row md:gap-[50px]'>
      <div className='grid w-full grid-cols-1 gap-[8px] md:grid-cols-3 md:gap-[16px]'>{showList()}</div>
      <div className='flex flex-shrink-0 flex-col-reverse gap-[16px] md:w-[280px] md:flex-col'>
        <div className='flex flex-col gap-[4px]'>
          <span className='text-base-100-lg-100'>Генплан проекта</span>
          <div className='text-base-300-lg-100 flex gap-[20px] text-base-600/50 md:hidden'>
            <span>{layouts[0].address}</span>
            <span>236 квартир</span>
          </div>
        </div>
        <button className='flex h-[250px] w-full justify-end rounded-[24px] bg-base-300 p-[16px] md:h-[220px]'>
          <span className='flex size-[38px] items-center justify-center rounded-full bg-base-100 after:size-[28px] after:bg-icon-full-screen after:bg-default md:size-[58px] md:after:size-[40px]' />
        </button>
      </div>
    </div>
  )
}

export default LayoutTypes
