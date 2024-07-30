'use client'
import React, { useContext } from 'react'
import { CatalogContext } from '@/layout/CategoryLayout/CatalogContext'
import Container from '@/layout/Container'

type CatalogContentProps = {
  tileView: React.ReactNode
  listView: React.ReactNode
  containerClassName?: string
}

function CatalogContent({ tileView, listView, containerClassName }: CatalogContentProps) {
  const { view } = useContext(CatalogContext)

  const onMoreBtnClick = () => {}

  const viewClasses = view === 'tile' ? 'md:grid md:grid-cols-3' : 'md:gap-[24px]'

  return (
    <Container>
      <div className={`flex flex-col gap-[16px] ${viewClasses} ${containerClassName}`}>
        {view === 'tile' ? tileView : listView}
      </div>
      <button
        className='text-base-500-reg-100-upper mt-[16px] w-full rounded-[20px] border border-primary py-[18px] text-primary md:py-[31px]'
        onClick={onMoreBtnClick}
      >
        показать ещё 4
      </button>
    </Container>
  )
}

export default CatalogContent
