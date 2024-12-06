'use client'
import React, { useContext } from 'react'
import { LayoutContext } from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutListContext'
import LayoutCard from '@/ui/cards/LayoutCard/LayoutCard'
import { DetailComplex } from '@/types/catalog/Complex'
import { ComplexHouseObject } from '@/types/complex/ComplexHouse'
import { DefaultObject } from '@/types/catalog/DefaultObject'

function convertActiveLayoutItemToLayoutCard(item: ComplexHouseObject): DefaultObject {
  return {
    categoryObject: '',
    completionDate: '',
    complexName: '',
    isReserved: false,
    latitude: 0,
    longitude: 0,
    minArea: 0,
    publicationTime: '',
    tags: [],
    typeObject: '',
    userId: null,
    description: '',
    priceDiscount: null,
    id: item.id,
    characteristics: [
      { id: 1, value: `${item.room} комн` },
      { id: 2, value: `${item.square} м²` },
      { id: 3, value: `${item.floor} этаж` },
    ],
    gallery: { images: [item.layoutUrl || ''], count: 1 },
    name: '',
    price: item.price,
    seoUrl: item.seoUrl,
    address: item.address,
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
