import React from 'react'
import CallPopupButton from '@/layout/Header/components/CallPopupButton'
import CityButton from '@/layout/Header/desktop/CityButton'
import { getCityByIpFromLocation } from '@/components/GeoPosition'

interface Props {
  className?: string
}

async function HeaderTop({ className }: Props) {
  const cityFromIp = await getCityByIpFromLocation()

  return (
    <div className={`items-center justify-between border-b border-b-base-100/15 pb-[13px] ${className}`}>
      <nav>
        <ul className='text-base-500-reg-200 flex items-center gap-[14px] opacity-50 peer-any-parent-[.is-black]/header-state:text-base-650 peer-any-parent-[.is-black]/header-state:opacity-100'></ul>
      </nav>
      <div className='flex items-center gap-[24px] peer-any-parent-[.is-black]/header-state:text-primary'>
        <CityButton autoSelectedCity={cityFromIp} />
        <CallPopupButton />
      </div>
    </div>
  )
}

export default HeaderTop
