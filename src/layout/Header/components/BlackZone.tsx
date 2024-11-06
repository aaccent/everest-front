'use client'

import React, { useContext } from 'react'
import { HeaderContext } from '@/layout/Header/Header.context'
import { showScroll } from '@/features/scroll'

function BlackZone() {
  const { setMenu } = useContext(HeaderContext)

  function clickHandler() {
    setMenu(null)
    showScroll()
  }

  return (
    <div
      className='pointer-events-none fixed inset-0 z-30 bg-base-600/60 opacity-0 transition-opacity peer-[[data-menu]]/header-state:pointer-events-auto peer-[[data-menu]]/header-state:opacity-100'
      onClick={clickHandler}
    />
  )
}

export default BlackZone
