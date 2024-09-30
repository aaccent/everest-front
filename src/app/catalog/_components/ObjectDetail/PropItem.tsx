import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  title: string
  className?: string
}

function PropItem({ title, children, className }: Props) {
  return (
    <li
      className={`text-base-300-lg-100 flex items-baseline gap-[8px] after:h-[1px] after:w-full after:border-b after:border-dashed after:border-b-base-600/50 ${className}`}
    >
      <span className='w-max flex-shrink-0 text-base-600/50'>{title}</span>
      <span className='order-1 w-max max-w-[220px] flex-shrink-0'>{children}</span>
    </li>
  )
}

export default PropItem
