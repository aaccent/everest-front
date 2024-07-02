import React from 'react'

function CatalogIcon() {
  function outputSquares() {
    return Array(4).fill(<span className='size-[5.8] bg-base-100 md:size-[4px] md:bg-base-600' />)
  }

  return (
    <span className='size-[16px] md:p-[5.5px] md:size-[22px]'>
      <span className='size-full grid grid-cols-2 gap-[4.3px] md:gap-[3px]'>{outputSquares()}</span>
    </span>
  )
}

export default CatalogIcon
