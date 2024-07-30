import React, { useContext } from 'react'
import { CatalogContext } from '@/layout/CategoryLayout/CatalogContext'

export default function CatalogViewButton() {
  const { setView } = useContext(CatalogContext)

  return (
    <div className='flex items-center gap-[2px]'>
      <button className='rounded-[20px] border p-[12px]' onClick={() => setView('tile')}>
        Плитка
      </button>
      <button className='rounded-[20px] border p-[12px]' onClick={() => setView('list')}>
        Список
      </button>
    </div>
  )
}
