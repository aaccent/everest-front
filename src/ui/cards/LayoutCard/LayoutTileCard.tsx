import React from 'react'
import { DetailComplex, LayoutObject } from '@/types/catalog/Complex'
import { formatStatusExtended } from '@/features/utility/date'
import Img from '@/ui/Img'
import { formatFullPrice } from '@/features/utility/price'

interface Props {
  item: LayoutObject
  complex: DetailComplex
}

function LayoutTileCard({ item, complex }: Props) {
  const statusFormatted = formatStatusExtended('2024-10-09T12:38:58.374978Z')

  const statusColor = statusFormatted?.giveAway ? 'text-system-green' : 'text-base-600/50'

  return (
    <div className='group/object w-full rounded-[32px] border border-base-400 p-[24px]'>
      <div className='flex justify-between gap-[7px]'>
        <div className='flex flex-col gap-[4px] md:gap-[6px]'>
          <span className='text-base-300-lg-100'>{complex.name}</span>
          <span className='text-base-400-lg-100 hidden text-system-red'>Забронировано</span>
          {statusFormatted && <span className={`text-base-400-lg-100 ${statusColor}`}>{statusFormatted.text}</span>}
        </div>
        <div className='flex gap-[4px]'>
          <button className='size-[36px] rounded-full bg-base-300 opacity-0 transition-opacity group-hover/object:opacity-100 md:size-[42px]'></button>
          <button className='size-[36px] rounded-full bg-base-300 opacity-0 transition-opacity group-hover/object:opacity-100 md:size-[42px]'></button>
          <button className='size-[36px] rounded-full bg-base-300 md:size-[42px]'></button>
        </div>
      </div>
      <div className='mb-[24px] mt-[32px]'>
        <Img
          className='mx-auto !size-[250px] object-cover object-center md:!size-[300px]'
          src={item.gallery[0]}
          width={280}
          height={280}
        />
      </div>
      <div>
        <div className='text-header-400 mb-[12px] flex gap-[8px] md:mb-[14px] md:gap-[12px]'>
          <span>{formatFullPrice(item.priceDiscount || item.price)}</span>
          {item.priceDiscount && <span className='line-through opacity-40'>{formatFullPrice(item.price)}</span>}
        </div>
        <div className='mb-[8px] flex gap-[6px] md:mb-[12px]'>
          <span className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[5px]'>1 комн</span>
          <span className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[5px]'>35м²</span>
          <span className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[5px]'>
            2/9 этаж
          </span>
        </div>
        <span className='text-base-300-lg-100 flex items-center gap-[6px] text-base-600/50 before:size-[15px] before:bg-icon-address before:opacity-50 before:bg-default'>
          ул. Космонавтов, д.5
        </span>
      </div>
    </div>
  )
}

export default LayoutTileCard
