'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ViewContext } from '@/page-components/catalog/CatalogPageFilter_test/ViewContext'
import { Complex } from '@/types/Complex'
import ComplexCard from '@/components/Cards/Complex/ComplexCard'
import ComplexFullCard from '@/components/Cards/Complex/ComplexFullCard'

type CatalogContentProps = { list: Complex[]; tilePerView?: number; listPerView?: number } // в list позднее добавятся типы карточек Объектов и Новостроек

function CatalogContent({ list, listPerView = 2, tilePerView = 3 }: CatalogContentProps) {
  const { view } = useContext(ViewContext)
  const objects = list.slice()
  const [objectsToShow, setObjectsToShow] = useState<number>(tilePerView)

  useEffect(() => {
    switch (view) {
      case 'tile':
        setObjectsToShow(tilePerView)
        break
      case 'list':
        setObjectsToShow(listPerView)
    }
  }, [listPerView, tilePerView, view])

  function showObjects(amount: number) {
    return objects.splice(0, amount).map((object) => {
      if (view === 'tile' || matchMedia('max-width: 768px').matches) {
        return <ComplexCard {...object} key={object.id} />
      } else {
        return <ComplexFullCard {...object} key={object.id} />
      }
    })
  }

  const onMoreBtnClick = () => {
    setObjectsToShow(objectsToShow + objectsToShow)
  }

  const moreBtnClass = () => {
    return objects.length ? '' : 'hidden'
  }

  const viewClasses = () => {
    return view === 'tile' ? 'md:grid md:grid-cols-3' : 'md:gap-[24px]'
  }

  return (
    <div>
      <div className={`flex flex-col gap-[16px] ${viewClasses()}`}>{showObjects(objectsToShow)}</div>
      <button
        className={`${moreBtnClass()} text-base-500-reg-100-upper mt-[16px] w-full rounded-[20px] border border-primary py-[18px] text-primary md:py-[31px]`}
        onClick={onMoreBtnClick}
      >
        {`показать ещё ${objects.length}`}
      </button>
    </div>
  )
}

export default CatalogContent
