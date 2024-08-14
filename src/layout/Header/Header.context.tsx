'use client'
import { createContext, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import { useScroll } from '@/features/scroll'
import { usePathname } from 'next/navigation'

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
  setMenuItem: (item: string | null) => void
  get menuItem(): string | null
  setMenu: (name: HeaderMenu | null) => void
  hasMenu: (...name: HeaderMenu[]) => boolean
  get menu(): HeaderMenu | null
  get scrolled(): boolean
  get isBlack(): boolean
}

/** Хранит и управляет состояниями шапки */
export const HeaderContext = createContext<HeaderContextObject>({} as HeaderContextObject)

export function HeaderProvider({ children, pathname: serverPathname }: HeaderStateProps & PropsWithChildren) {
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const { scrollPos } = useScroll()
  const pathname = usePathname()
  const [menu, setMenu] = useState<HeaderMenu | null>(null)
  const [menuItem, setMenuItem] = useState<string | null>(null)

  const isBlack = useCallback(
    (pathname: string) => {
      if (scrollPos >= 20) return true
      if (pathname !== '/') return true
      if (menu) return true

      return false
    },
    [scrollPos, menu],
  )

  const [styles, setStyles] = useState({ isBlack: isBlack(serverPathname), isFixed: false })

  useEffect(() => {
    setStyles((current) => {
      const copy = { ...current }
      if (scrollPos >= 20 && !current.isFixed) copy.isFixed = true
      if (scrollPos < 20 && current.isFixed) copy.isFixed = false

      return copy.isFixed !== current.isFixed ? copy : current
    })
  }, [scrollPos])

  useEffect(() => {
    setStyles((current) => {
      const copy = { ...current }
      copy.isBlack = isBlack(pathname)

      // Проверка нужна чтобы избавится от лишних перерисовок.
      // Объекты в состояниях являются всегда новым значением и
      // это заставляет реакт пересовывать компонент.
      // Если отдавать тот же самый объект, то состояние не будет считаться измененным.
      // Подробнее тут https://react.dev/learn/updating-objects-in-state
      return copy.isBlack !== current.isBlack ? copy : current
    })
  }, [pathname, scrollPos, menu, isBlack])

  // Закрывает меню если меняется ссылка
  useEffect(() => {
    setMenu(null)
  }, [pathname])

  // Закрытие элемента мобильного меню из MobileDetailMenu если закрывается всё меню
  useEffect(() => {
    if (menu !== 'mobile') return

    setMenuItem(null)
  }, [menu])

  const className = [
    // prettier-ignore
    'peer/header-state',
    'hidden',
    ...(styles.isBlack ? ['is-black'] : []),
    ...(styles.isFixed ? ['is-fixed'] : []),
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
    setMenuItem,
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
      return isBlack(pathname)
    },
  }

  const dataset = {
    ...(menu ? { 'data-menu': menu } : {}),
    ...(pathname !== '/' ? { 'data-inner-page': '' } : { 'data-main-page': '' }),
  }

  return (
    <HeaderContext.Provider value={value}>
      <span className={className} ref={spanRef} {...dataset} />
      {children}
    </HeaderContext.Provider>
  )
}
