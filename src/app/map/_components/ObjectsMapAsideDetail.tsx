import React from 'react'
import Img from '@/ui/Img'
import { formatPriceShort } from '@/features/utility/price'
import { flatPlural } from '@/features/utility/pluralRules'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import Link from 'next/link'
import { generateObjectLink } from '@/features/link'

/**
 * Выводит детальную информацию элемента с карты
 */
export function ObjectsMapDetailListItem(item: DefaultObject) {
  const href = generateObjectLink(item)

  function showProperties() {
    return item.characteristics?.map((prop) => (
      <span
        className='flex items-center gap-[4px] after:size-[5px] after:rounded-full after:bg-base-600/50 last:after:hidden'
        key={prop.id}
      >
        {prop.value}
      </span>
    ))
  }

  return (
    <li className='flex gap-[16px]'>
      <Link className='relative h-[100px] w-[140px] rounded-[16px] bg-base-600/10' href={href}>
        <Img src={item.gallery?.images?.[0]} fill />
      </Link>
      <div className='flex flex-col'>
        <Link className='text-header-500 flex gap-[8px]' href={href}>
          <span>{formatPriceShort(item.priceDiscount || item.price)}</span>
          {!!item.priceDiscount && <span className='line-through opacity-40'>{formatPriceShort(item.price)}</span>}
        </Link>
        {!!item.characteristics?.length && (
          <Link className='text-base-400-lg-100 mb-[12px] mt-[8px] flex items-center gap-[4px]' href={href}>
            {showProperties()}
          </Link>
        )}
        <div className='mt-auto flex gap-[6px]'>
          <button className='flex size-[36px] items-center justify-center rounded-full bg-base-300 after:size-[20px] after:bg-icon-heart after:bg-default' />
          <button className='flex size-[36px] items-center justify-center rounded-full bg-base-300 after:size-[20px] after:bg-icon-scale after:bg-default' />
        </div>
      </div>
    </li>
  )
}

interface Props {
  houseAddress: string | null
  flatsCount: number
  onCloseButtonClick: () => void
  list: DefaultObject[]
}

/**
 * Компонент нужен только для {@link ObjectsMap} и существует для упрощения чтения.
 * Отделяет компонент с детальной информацией о выбранном элементе на карте
 * @param houseAddress - адрес дома
 * @param flatsCount - количество квартир по выбранной точке
 * @param onCloseButtonClick - обработчик при нажатии на кнопку закрытия
 * @param list - список элементов для вывода.
 * Элементы выводятся через {@link ObjectsMapDetailListItem}
 */
export default function ObjectsMapAsideDetail({ houseAddress, flatsCount, onCloseButtonClick, list = [] }: Props) {
  function showList() {
    return list.map((item) => {
      return <ObjectsMapDetailListItem key={item.id} {...item} />
    })
  }

  return (
    <div className='pointer-events-auto hidden w-full max-w-[380px] flex-col rounded-[32px] bg-base-100 p-[20px] pb-0 md:flex'>
      <div className='mb-[20px] flex gap-[12px] border-b border-b-base-600/10 pb-[20px]'>
        <div className='flex items-center gap-[12px]'>
          <div className='flex size-[48px] items-center justify-center rounded-full bg-primary after:size-[20px] after:bg-icon-house after:filter-base-100 after:bg-default' />
          <div className='flex flex-col gap-[4px]'>
            {houseAddress && <div className='text-base-300-lg-100'>{houseAddress}</div>}
            <div className='text-base-400-lg-100 text-base-600/50'>
              {flatsCount} {flatPlural.get(flatsCount)}
            </div>
          </div>
        </div>
        <button
          className='ml-auto flex size-[36px] items-center justify-center rounded-full bg-base-300 after:size-[14px] after:bg-icon-close after:filter-base-600 after:bg-default'
          onClick={onCloseButtonClick}
        />
      </div>
      <ul className='flex h-1 grow flex-col gap-[24px] overflow-y-auto pb-[25px] scrollbar-custom scroll-btn-yb:h-[90px]'>
        {showList()}
      </ul>
    </div>
  )
}
