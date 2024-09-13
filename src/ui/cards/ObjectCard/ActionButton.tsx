import React from 'react'

interface Props {
  className?: string
}

export function ActionButton({ className }: Props) {
  return (
    <button
      className={`flex size-[36px] items-center justify-center rounded-full bg-base-600/50 transition-opacity before:size-[20px] before:filter-base-100 before:bg-default group-hover/object-card:opacity-100 md:size-[64px] md:before:size-[24px] ${className}`}
    />
  )
}
