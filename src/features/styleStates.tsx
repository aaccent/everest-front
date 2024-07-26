'use client'

import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useScroll } from '@/features/scroll'

interface StyleStateContextObject {
  toggleClass: (name: string) => void
  removeClass: (name: string) => void
  addClass: (name: string) => void
  hasAnyClass: (...name: string[]) => boolean
  classes: string[]
}

const StyleStateContext = createContext<StyleStateContextObject>({} as StyleStateContextObject)

/** @description Выставляет классы div элементу.
 * Далее различные элементы могут использовать эти классы для стилизации.
 * Суть компонента в том, чтобы хранить состояния в CSS классах без useState */
export function StyleStateProvider({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const { scrollPos } = useScroll()
  const [classes, setClasses] = useState<string[]>([])

  const addClass: StyleStateContextObject['addClass'] = function (name) {
    setClasses((current) => {
      if (current.includes(name)) return current

      const copy = [...current]
      copy.push(name)
      return copy
    })
  }

  const removeClass: StyleStateContextObject['removeClass'] = function (name) {
    setClasses((current) => {
      if (!current.includes(name)) return current

      const targetIndex = current.indexOf(name)
      return current.toSpliced(targetIndex, 1)
    })
  }

  const toggleClass: StyleStateContextObject['toggleClass'] = function (name) {
    setClasses((current) => {
      if (current.includes(name)) {
        const targetIndex = current.indexOf(name)
        return current.toSpliced(targetIndex, 1)
      } else {
        const copy = [...current]
        copy.push(name)
        return copy
      }
    })
  }

  const hasAnyClass: StyleStateContextObject['hasAnyClass'] = function (...searchClasses) {
    for (const className of searchClasses) {
      if (classes.includes(className)) return true
    }

    return false
  }

  // Классы для смены темы сайта в зависимости от страницы
  useEffect(() => {
    addClass(pathname === '/' ? 'is-white' : 'is-black')
  }, [pathname])

  // Классы если пользователь прокрутил полосу до определенного момента
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (scrollPos >= 20) {
      addClass('is-scrolled')
    } else {
      removeClass('is-scrolled')
    }
  }, [scrollPos])

  return (
    <StyleStateContext.Provider value={{ addClass, removeClass, toggleClass, hasAnyClass, classes }}>
      <div className={`peer/style-state absolute hidden ${classes.join(' ')}`} />
      {children}
    </StyleStateContext.Provider>
  )
}

export function useStyleState() {
  return useContext(StyleStateContext)
}
