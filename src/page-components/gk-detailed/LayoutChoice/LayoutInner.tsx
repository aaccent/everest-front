'use client'
import React, { useState } from 'react'

interface LayoutInnerProps {
  listView: React.ReactNode
  typeView: React.ReactNode
}

function LayoutInner({ listView, typeView }: LayoutInnerProps) {
  const [view, setView] = useState<'list' | 'types'>('list')
  return (
    <div className='rounded-[20px] border border-base-400 py-[20px]'>
      <div className='flex justify-between border-b border-b-base-400 px-[20px] pb-[20px]'>
        <div>
          <button onClick={() => setView('list')}>Списком</button>
          <button onClick={() => setView('types')}> типы Планировок</button>
        </div>
        <div className='flex size-[35px] items-center justify-center rounded-[12px] bg-base-300 after:block after:size-full after:bg-icon-filter after:bg-default-auto md:hidden'></div>
      </div>
      {view === 'list' ? listView : typeView}
    </div>
  )
}

export default LayoutInner
