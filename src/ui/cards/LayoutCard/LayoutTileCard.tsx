import React from 'react'
import { formatStatusExtended } from '@/features/utility/date'
import Img from '@/ui/Img'
import { formatFullPrice } from '@/features/utility/price'
import Link from 'next/link'
import { ROUTES } from '@/globals/paths'
import { DefaultObject } from '@/types/catalog/DefaultObject'

interface Props {
  item: DefaultObject
  complexSeo: string
}

function LayoutTileCard({ item, complexSeo }: Props) {
  const statusFormatted = formatStatusExtended('2024-10-09T12:38:58.374978Z')
  const statusColor = statusFormatted?.giveAway ? 'text-system-green' : 'text-base-600/50'

  const href = `${ROUTES.COMPLEXES}/${complexSeo}/${item.seoUrl}`

  function showProps() {
    return item.characteristics.map((prop, i) => (
      <span className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[5px]' key={i}>
        {prop.value}
      </span>
    ))
  }

  return (
    <div className='group/object w-full rounded-[32px] border border-base-400 p-[24px]'>
      <div className='flex justify-between gap-[7px]'>
        <Link className='flex flex-col gap-[4px] md:gap-[6px]' href={href}>
          <span className='text-base-300-lg-100'>{item.complexName}</span>
          <span className='text-base-400-lg-100 hidden text-system-red'>Забронировано</span>
          {statusFormatted && <span className={`text-base-400-lg-100 ${statusColor}`}>{statusFormatted.text}</span>}
        </Link>
        <div className='flex gap-[4px]'></div>
      </div>
      <Link className='mb-[24px] mt-[32px] block' href={href}>
        <Img
          className='mx-auto !size-[250px] object-cover object-center md:!size-[300px]'
          src={item.gallery.images?.[0]}
          width={280}
          height={280}
        />
      </Link>
      <Link href={href}>
        <div className='text-header-400 mb-[12px] flex gap-[8px] md:mb-[14px] md:gap-[12px]'>
          <span>{formatFullPrice(item.priceDiscount || item.price)}</span>
          {item.priceDiscount && <span className='line-through opacity-40'>{formatFullPrice(item.price)}</span>}
        </div>
        <div className='mb-[8px] flex gap-[6px] md:mb-[12px]'>{showProps()}</div>
        <span className='text-base-300-lg-100 flex items-center gap-[6px] text-base-600/50 before:size-[15px] before:bg-icon-address before:opacity-50 before:bg-default'>
          {item.address}
        </span>
      </Link>
    </div>
  )
}

export default LayoutTileCard
