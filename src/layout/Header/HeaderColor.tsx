'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

/** @description Выставляет класс div элементу на основе location.path.
 * Компонент [Header]{@link Header} на основе класса меняет свои стили */
function HeaderColor() {
  const pathname = usePathname()

  const className = pathname === '/' ? 'is-white' : 'is-black'

  return <div className={`peer/header-color ${className}`}></div>
}

export default HeaderColor
