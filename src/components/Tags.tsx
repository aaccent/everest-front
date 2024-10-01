import React from 'react'
import { Tag } from '@/types/Tag'

interface Props {
  list: Tag[] | null
  /**
   * Обязателен потому что стили позиционирования везде разные.
   * Поэтому необходимо указать `top`, `left` или т.д.
   * */
  className: string
  itemClassName?: string
}

function Tags({ list, className, itemClassName }: Props) {
  if (!list?.length) return null

  function showItems() {
    return list?.map((item) => (
      <li
        className={`text-base-400-lg-100 rounded-[10px] bg-base-100 px-[8px] py-[5px] text-base-600 ${itemClassName}`}
        key={item.id}
      >
        {item.name}
      </li>
    ))
  }

  return <ul className={`absolute z-10 flex gap-[4px] ${className}`}>{showItems()}</ul>
}

export default Tags
