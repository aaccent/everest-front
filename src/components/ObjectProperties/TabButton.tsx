import React, { PropsWithChildren } from 'react'

export const TAB_TYPE = {
  DESCRIPTION: 'description',
  PROPERTIES: 'prop',
}
export type Tab = (typeof TAB_TYPE)[keyof typeof TAB_TYPE]

interface TabButtonProps extends PropsWithChildren {
  className?: string
  onClick: () => void
}

export function TabButton({ className, onClick, children }: TabButtonProps) {
  return (
    <button
      className={`text-header-400 relative rounded-t-[20px] bg-[#eee] p-[20px] text-base-600/50 transition-colors [&.active]:z-10 [&.active]:bg-base-200 [&.active]:text-base-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
