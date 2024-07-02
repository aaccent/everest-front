'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useScroll } from '@/features/scroll'
import { createPortal } from 'react-dom'

/** @description Выводит элемент в body с классом из состояния.
 * Класс можно менять через функции [setClassName]{@link setClassName} и [toggleClassName]{@link toggleClassName} */
export function useStyleState() {
  const [className, setClassName] = useState<string>('')

  /** @description Выводит элемент body через [React.createPortal]{@link createPortal} с классом из состояния */
  function StateElement() {
    return createPortal(<div className={className} />, document.body)
  }

  /**
   * @param {string} name - Класс, который будет включаться или выключаться
   * @description Если [name]{@link name} уже стоит в значении класса, то устанавливается пустая строка
   * */
  function toggleClassName(name: string) {
    setClassName((prev) => {
      if (name === prev) return ''
      return name
    })
  }

  return { setClassName, toggleClassName, className, StateElement }
}

/** @description Выставляет классы div элементу.
 * Далее различные элементы могут использовать эти классы для стилизации.
 * Суть компонента в том, чтобы хранить состояния в CSS классах без useState */
function StyleStates() {
  const pathname = usePathname()
  const { scrollPos } = useScroll()
  const ref = useRef<HTMLDivElement>(null)

  // Scroll className
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (scrollPos >= 20) {
      ref.current?.classList.add('is-scrolled')
    } else {
      ref.current?.classList.remove('is-scrolled')
    }
  }, [scrollPos])

  const className = [
    // prettier-ignore
    pathname === '/' ? 'is-white' : 'is-black',
  ].join(' ')

  return <div className={`peer/style-state ${className}`} ref={ref} />
}

export default StyleStates
