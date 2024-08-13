'use client'
import { createContext, PropsWithChildren, useCallback, useRef, useState } from 'react'
import { useScroll } from '@/features/scroll'

export const HEADER_MENUS = {
  CATALOG: 'catalog',
  MOBILE: 'mobile',
  RENT: 'rent',
  SALE: 'sale',
} as const

export type HeaderMenu = (typeof HEADER_MENUS)[keyof typeof HEADER_MENUS] | string

interface HeaderStateProps {
  pathname: string
}

type HeaderContextObject = {
  toggleMenu: (name: HeaderMenu | null) => void
  toggleMenuItem: (item: string | null) => void
  get menuItem(): string | null
  setMenu: (name: HeaderMenu | null) => void
  hasMenu: (...name: HeaderMenu[]) => boolean
  get menu(): HeaderMenu | null
  get scrolled(): boolean
  get isBlack(): boolean
}

export const HeaderContext = createContext<HeaderContextObject>({} as HeaderContextObject)

export function HeaderProvider({ children, pathname }: HeaderStateProps & PropsWithChildren) {
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const { scrollPos } = useScroll()
  const [menu, setMenu] = useState<HeaderMenu | null>(null)
  const [menuItem, setMenuItem] = useState<string | null>(null)

  const isBlack = useCallback(() => {
    if (scrollPos >= 20) return true
    if (pathname !== '/') return true
    if (menu) return true

    return false
  }, [pathname, scrollPos, menu])

  const isFixed = useCallback(() => {
    return scrollPos >= 20
  }, [scrollPos])

  const className = [
    // prettier-ignore
    'peer/header-state',
    'hidden',
    ...(isBlack() ? ['is-black'] : []),
    ...(isFixed() ? ['is-fixed'] : []),
  ].join(' ')

  const value: HeaderContextObject = {
    setMenu,
    toggleMenu(name) {
      setMenu((current) => {
        if (current === name) return null
        else return name
      })
    },
    get menu() {
      return menu
    },
    hasMenu(...name) {
      return name.includes(menu || '')
    },
    toggleMenuItem(item) {
      setMenuItem((current) => {
        if (current === item) return null
        else return item
      })
    },
    get menuItem() {
      return menuItem
    },
    get scrolled() {
      return scrollPos >= 20
    },
    get isBlack() {
      return isBlack()
    },
  }

  const dataset = {
    ...(menu ? { 'data-menu': menu } : {}),
    ...(menuItem ? { 'menu-item': '' } : {}),
  }

  return (
    <HeaderContext.Provider value={value}>
      <span className={className} ref={spanRef} {...dataset} />
      {children}
    </HeaderContext.Provider>
  )
}
