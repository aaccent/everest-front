import React, { PropsWithChildren } from 'react'

export function PopupTemplate({ children }: PropsWithChildren) {
  return <div className='fixed inset-0 z-[80] bg-base-600/60'>{children}</div>
}
