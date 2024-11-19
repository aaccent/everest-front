import React from 'react'
import { getLayouts } from '@/globals/api'
import { DetailComplex } from '@/types/catalog/Complex'
import LayoutGroupCard from '@/ui/cards/LayoutGroupCard'
import { flatPlural } from '@/features/utility/pluralRules'
import GenPlanButton from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/GenPlanButton'

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
            <span>{complex.address}</span>
            <span>
              {complex.objectCount} {flatPlural.get(complex.objectCount)}
            </span>
          </div>
        </div>
        <GenPlanButton complex={complex} />
      </div>
    </div>
  )
}

export default LayoutTypes
