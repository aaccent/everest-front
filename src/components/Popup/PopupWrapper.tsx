import React from 'react'

function PopupWrapper({ popup }: { popup?: React.ReactNode }) {
  return popup && <div className='fixed inset-0 z-50 overflow-auto bg-base-600/60'>{popup}</div>
}

export default PopupWrapper
