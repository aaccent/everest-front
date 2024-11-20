'use client'
import React, { useState } from 'react'
import Button from '@/ui/buttons/Button'
import { DetailComplex } from '@/types/catalog/Complex'
import { flatPlural } from '@/features/utility/pluralRules'

interface LayoutInnerProps {
  listView: React.ReactNode
  typeView: React.ReactNode
  complex: DetailComplex
}

function LayoutInner({ complex, listView, typeView }: LayoutInnerProps) {
  const [view, setView] = useState<'list' | 'types'>('list')

  return (
    <div className='rounded-[20px] border border-base-400 pt-[20px]'>
      <div className='flex justify-between border-b border-b-base-400 px-[20px] pb-[20px]'>
        <div className='flex w-full items-center gap-[8px]'>
          <Button
            variation='second'
            size='small'
            text='Списком'
            onClick={() => setView('list')}
            className={view === 'list' ? 'bg-primary !text-base-100' : ''}
          />
          <Button
            variation='second'
            size='small'
            text='типы Планировок'
            onClick={() => setView('types')}
            className={view === 'types' ? 'bg-primary !text-base-100' : ''}
          />
          <div className='text-base-300-lg-100 ml-auto hidden items-center gap-[8px] text-base-600/50 md:flex'>
            {complex.address && (
              <span className='flex items-center gap-[4px] before:size-[14px] before:bg-icon-address before:opacity-50 before:bg-default'>
                {complex.address}
              </span>
            )}
            <span className='flex items-center gap-[2px] before:size-[24px] before:bg-icon-key before:opacity-50 before:bg-default'>
              {complex.objectCount} {flatPlural.get(complex.objectCount)}
            </span>
          </div>
        </div>
        <button className='flex size-[35px] items-center justify-center rounded-[12px] bg-base-300 after:block after:size-full after:bg-icon-filter after:bg-default-auto md:hidden' />
      </div>
      <div className='justify-between p-[20px] md:flex md:py-[32px] md:pl-[32px] md:pr-[39px]'>
        {view === 'list' ? listView : typeView}
      </div>
    </div>
  )
}

export default LayoutInner
