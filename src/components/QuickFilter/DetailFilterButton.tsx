'use client'

import React from 'react'

interface Props {
  className?: string
}

function DetailFilterButton({ className }: Props) {
  return (
    <button
      className={`${className} flex size-[42px] items-center justify-center rounded-[12px] bg-base-100 p-[10px] after:size-[21px] after:bg-icon-filter after:bg-default`}
      type='button'
    />
  )
}

export default DetailFilterButton
