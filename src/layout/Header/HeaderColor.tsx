'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

function HeaderColor() {
  const pathname = usePathname()

  const className = pathname === '/' ? 'is-white' : 'is-black'

  return <div className={`peer/header-color ${className}`}></div>
}

export default HeaderColor
