'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

export type Viewport = 'mobile' | 'desktop'

interface AdaptiveContextObject {
  isMobile: boolean
  isDesktop: boolean
}

const AdaptiveContext = createContext({} as AdaptiveContextObject)

interface AdaptiveProviderProps extends PropsWithChildren {
  viewport?: Viewport
}

export function AdaptiveProvider({ children, viewport }: AdaptiveProviderProps) {
  const isMobile = viewport === 'mobile'
  const isDesktop = viewport === 'desktop'

  return <AdaptiveContext.Provider value={{ isMobile, isDesktop }}>{children}</AdaptiveContext.Provider>
}

export function IsMobile({ children }: PropsWithChildren) {
  const { isDesktop } = useContext(AdaptiveContext)

  if (isDesktop) return null

  return <>{children}</>
}

export function IsDesktop({ children }: PropsWithChildren) {
  const { isMobile } = useContext(AdaptiveContext)

  if (isMobile) return null

  return <>{children}</>
}
