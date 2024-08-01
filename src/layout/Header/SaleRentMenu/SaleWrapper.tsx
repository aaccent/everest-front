import React, { PropsWithChildren } from 'react'

function SaleWrapper({ children }: PropsWithChildren) {
  return (
    <div className='px-container fixed inset-x-0 top-[115px] z-10 hidden w-full gap-[16px] bg-base-100 pb-[56px] pt-[32px] peer-[:is(.sale-menu)]/style-state:flex'>
      {children}
    </div>
  )
}

export default SaleWrapper
