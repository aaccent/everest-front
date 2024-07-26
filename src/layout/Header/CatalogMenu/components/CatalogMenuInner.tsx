'use client'

import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

interface CatalogMenuContextObj {
  activeId: string
  setActiveId: (id: string) => void
}

export const CatalogMenuContext = createContext<CatalogMenuContextObj>({} as CatalogMenuContextObj)

interface CatalogMenuItemProps extends PropsWithChildren {
  id: string
  className?: string
  activeClass?: string
  inactiveClass?: string
}

export function CatalogMenuInnerButton({ id, className, activeClass, inactiveClass, children }: CatalogMenuItemProps) {
  const { activeId, setActiveId } = useContext(CatalogMenuContext)

  return (
    <button className={`${activeId === id ? activeClass : inactiveClass} ${className}`} onClick={() => setActiveId(id)}>
      {children}
    </button>
  )
}

export function CatalogMenuSubcategories({
  id,
  className,
  activeClass,
  inactiveClass,
  children,
}: CatalogMenuItemProps) {
  const { activeId, setActiveId } = useContext(CatalogMenuContext)

  return <ul className={`${activeId === id ? activeClass : inactiveClass} ${className}`}>{children}</ul>
}

interface Props extends PropsWithChildren {
  initId: string
}

function CatalogMenuProvider({ initId, children }: Props) {
  const [activeId, setActiveId] = useState<string>(initId)

  return <CatalogMenuContext.Provider value={{ activeId, setActiveId }}>{children}</CatalogMenuContext.Provider>
}

export default CatalogMenuProvider
