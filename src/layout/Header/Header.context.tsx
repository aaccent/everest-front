'use client'
import { createContext, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import { showScroll, useScroll } from '@/features/visible/scroll'
import { usePathname } from 'next/navigation'

export const HEADER_MENUS = {
  CATALOG: 'catalog',
  MOBILE: 'mobile',
  RENT: 'rent',
  SALE: 'sale',
} as const

export type HeaderMenu = (typeof HEADER_MENUS)[keyof typeof HEADER_MENUS] | string

/** Значение вертикальной прокрутки, в какой момент шапка должна изменить стили */
const SCROLL_TRIGGER_POSITION = 20

interface HeaderStateProps {
  pathname: string
}

type HeaderContextObject = {
  /**
   * Если `name` меню открыто, то закрывает его, иначе открывает.
   * Если передать `null`, то ничего не произойдет.
   * */
  toggleMenu: (name: HeaderMenu | null) => void
  /**
   * Если `item` элемент меню открыт, то закрывает его, иначе открывает.
   * Если передать `null`, то ничего не произойдет
   * */
  toggleMenuItem: (item: string | null) => void
  setMenuItem: (item: string | null) => void
  /**
   * Получить активный элемент из открытого меню {@link HEADER_MENUS.MOBILE}
   * @return id типа `string` активного меню, если присутствует, иначе `null`
   * */
  get menuItem(): string | null
  /**
   * Установить активное меню с названием `name`.
   * Если передать `null`, то меню закроется.
   * */
  setMenu: (name: HeaderMenu | null) => void
  /**
   * Проверить активно ли одно из меню шапки `name`.
   * @return `true` если хотя бы одно меню активно, иначе `false`
   * */
  hasMenu: (...name: HeaderMenu[]) => boolean
  /**
   * Получить текущее активное меню шапки.
   * Возможные меню описаны в {@link HEADER_MENUS}
   * @return `string` если есть активное меню, иначе `null`
   * */
  get menu(): HeaderMenu | null
  /**
   * `true` когда прокрутка страницы ровна или более
   * порога из {@link SCROLL_TRIGGER_POSITION}, иначе `false`
   * */
  get scrolled(): boolean
  /** `true` когда находится не на главной странице, иначе `false` */
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
      if (scrollPos >= SCROLL_TRIGGER_POSITION) return true
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
      if (scrollPos >= SCROLL_TRIGGER_POSITION && !current.isFixed) copy.isFixed = true
      if (scrollPos < SCROLL_TRIGGER_POSITION && current.isFixed) copy.isFixed = false

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
    showScroll()
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
      return scrollPos >= SCROLL_TRIGGER_POSITION
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
