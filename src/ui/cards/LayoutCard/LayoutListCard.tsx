import React, { PropsWithChildren } from 'react'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import { formatStatusExtended } from '@/features/utility/date'
import { ROUTES } from '@/globals/paths'
import Img from '@/ui/Img'
import Link from 'next/link'
import { formatComplexName } from '@/features/utility/texts'
import { formatFullPrice } from '@/features/utility/price'

interface ParameterProps extends PropsWithChildren {
  title: string
}

function Parameter({ title, children }: ParameterProps) {
  return (
    <div className='text-base-200-lg-100 flex flex-col gap-[12px]'>
      <span className='opacity-50'>{title}</span>
      <span>{children}</span>
    </div>
  )
}

interface Props {
  item: DefaultObject
  complexSeo: string
}

function LayoutListCard({ item, complexSeo }: Props) {
  const statusFormatted = formatStatusExtended('2024-10-09T12:38:58.374978Z')
  const statusColor = statusFormatted?.giveAway ? 'text-system-green' : 'text-base-600'

  const href = `${ROUTES.COMPLEXES}/${complexSeo}/${item.seoUrl}`
  const name = item.name.length > 20 ? `${item.name.slice(0, 21)}...` : item.name

  return (
    <div className='flex items-center rounded-[32px] border border-base-400 py-[30px] pl-[30px] pr-[56px]'>
      <Link className='mr-[32px]' href={href}>
        <Img className='size-[92px] object-contain object-left' src={item.gallery.images?.[0]} width={92} height={92} />
      </Link>
      <Link className='mr-[120px] flex flex-col gap-[8px]' href={href}>
        <span className='text-header-500' title={item.name}>
          {name}
        </span>
        <span className='text-base-300-lg-100 flex items-center gap-[4px] opacity-50 before:size-[18px] before:bg-icon-address before:bg-default'>
          {item.address}
        </span>
      </Link>
      <div className='mr-[105px] flex gap-[48px]'>
        {statusFormatted && (
          <Parameter title='Сдача'>
            <span className={statusColor}>{statusFormatted?.text.replace('Сдача', '')}</span>
          </Parameter>
        )}
        <Parameter title='Жилой комплекс'>
          <Link
            className='flex items-baseline gap-[4px] transition-colors after:size-[9px] after:bg-icon-arrow after:filter-base-600 after:bg-default hover:text-primaryHover'
            href={`${ROUTES.COMPLEXES}/${complexSeo}`}
          >
            {formatComplexName(item.complexName || '')}
          </Link>
        </Parameter>
      </div>
      <Link className='text-header-400' href={href}>
        {formatFullPrice(item.price)}
      </Link>
    </div>
  )
}

export default LayoutListCard
