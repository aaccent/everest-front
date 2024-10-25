'use client'
import React, { useContext } from 'react'
import { LayoutContext } from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutListContext'
import LayoutCard from '@/ui/cards/LayoutCard/LayoutCard'
import { DetailComplex, LayoutObject } from '@/types/catalog/Complex'
import { ComplexHouseObject } from '@/types/complex/ComplexHouse'

function convertActiveLayoutItemToLayoutCard(item: ComplexHouseObject): LayoutObject {
  return {
    description: '',
    h1: '',
    priceDiscount: null,
    id: item.id,
    title: '',
    area: 0,
    characteristics: [
      { name: '', value: `${item.room} комн` },
      { name: '', value: `${item.square} м²` },
      { name: '', value: `${item.floor} этаж` },
    ],
    dealType: '',
    gallery: [item.layoutUrl || ''],
    houseNumber: 0,
    name: '',
    price: item.price,
    section: '',
    seoUrl: item.seoUrl,
  }
}

interface Props {
  complex: DetailComplex
}

function ActiveLayoutCard({ complex }: Props) {
  const { activeObject } = useContext(LayoutContext)

  if (!activeObject) return null

  return (
    <div className='sticky top-[50px] hidden h-fit w-full max-w-[380px] md:block'>
      <LayoutCard item={convertActiveLayoutItemToLayoutCard(activeObject)} complex={complex} />
    </div>
  )
}

export default ActiveLayoutCard
