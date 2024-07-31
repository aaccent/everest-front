'use client'

import React, { useContext } from 'react'
import { CatalogContext } from '@/features/CatalogContext'

export default function CatalogViewButton() {
  const { setView, view } = useContext(CatalogContext)

  return (
    <div className='flex items-center gap-[2px]'>
      <button
        className={`size-[28px] bg-icon-grid-view transition-opacity filter-base-600 bg-default ${view === 'tile' ? 'opacity-100' : 'opacity-50'}`}
        onClick={() => setView('tile')}
      />
      <button
        className={`size-[28px] bg-icon-list-view filter-base-600 bg-default ${view === 'list' ? 'opacity-100' : 'opacity-50'}`}
        onClick={() => setView('list')}
      />
    </div>
  )
}
