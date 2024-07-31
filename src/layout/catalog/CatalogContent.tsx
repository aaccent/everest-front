'use client'
import React, { useContext } from 'react'
import { CategoryContext } from '@/layout/catalog/CategoryContext'
import Container from '@/layout/Container'

type CatalogContentProps = {
  tileView: React.ReactNode
  listView: React.ReactNode
  tileClassName?: string
  listClassName?: string
}

function CatalogContent({ tileView, listView, tileClassName, listClassName }: CatalogContentProps) {
  const { view } = useContext(CategoryContext)

  const onMoreBtnClick = () => {}

  let viewStyle

  if (view === 'tile') {
    viewStyle = `md:grid md:grid-cols-3 gap-[16px] ${tileClassName}`
  } else {
    viewStyle = `md:gap-[24px] ${listClassName}`
  }

  return (
    <Container>
      <div className={`flex flex-col ${viewStyle}`}>{view === 'tile' ? tileView : listView}</div>
      <button
        className='text-base-500-reg-100-upper mt-[16px] w-full rounded-[20px] border border-primary py-[18px] text-primary md:mt-[40px] md:py-[31px]'
        onClick={onMoreBtnClick}
      >
        показать ещё 4
      </button>
    </Container>
  )
}

export default CatalogContent
