'use client'
import React, { useContext } from 'react'
import Container from '@/layout/Container'
import { ViewContext } from '@/page-components/catalog/CatalogPageFilter_test/ViewContext'

function CatalogPageFilter() {
  const { setView } = useContext(ViewContext)

  return (
    <Container className='mb-[40px] hidden justify-between md:flex'>
      <button className='rounded-[20px] border p-[12px]' onClick={() => setView('tile')}>
        Плитка
      </button>
      <button className='rounded-[20px] border p-[12px]' onClick={() => setView('list')}>
        Список
      </button>
    </Container>
  )
}

export default CatalogPageFilter
