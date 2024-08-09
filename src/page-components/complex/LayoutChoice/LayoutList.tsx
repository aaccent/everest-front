import React from 'react'
import { DetailComplex } from '@/types/Complex'
import ObjectsList from '@/page-components/complex/LayoutChoice/ObjectsList'

interface LayoutListProps {
  complex: DetailComplex
}

function LayoutList({ complex }: LayoutListProps) {
  return complex.objects.map((house) => <ObjectsList complex={complex} house={house} key={house.objects[0].id} />)
}

export default LayoutList
