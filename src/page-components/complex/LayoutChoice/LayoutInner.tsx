'use client'
import React, { useState } from 'react'
import Button from '@/ui/buttons/Button'

interface LayoutInnerProps {
  listView: React.ReactNode
  typeView: React.ReactNode
}

function LayoutInner({ listView, typeView }: LayoutInnerProps) {
  const [view, setView] = useState<'list' | 'types'>('list')

  return (
    <div className='rounded-[20px] border border-base-400 py-[20px]'>
      <div className='flex justify-between border-b border-b-base-400 px-[20px] pb-[20px]'>
        <div className='flex items-center gap-[8px]'>
          <Button
            variation='second'
            size='small'
            text='Списком'
            onClick={() => setView('list')}
            className={view === 'list' ? 'bg-primary text-base-100' : ''}
          />
          <Button
            variation='second'
            size='small'
            text='типы Планировок'
            onClick={() => setView('types')}
            className={view === 'types' ? 'bg-primary text-base-100' : ''}
          />
        </div>
        <div className='flex size-[35px] items-center justify-center rounded-[12px] bg-base-300 after:block after:size-full after:bg-icon-filter after:bg-default-auto md:hidden'></div>
      </div>
      <div className='p-[20px] md:py-[32px] md:pl-[32px] md:pr-[39px]'>{view === 'list' ? listView : typeView}</div>
    </div>
  )
}

export default LayoutInner
