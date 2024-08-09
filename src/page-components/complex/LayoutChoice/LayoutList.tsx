import React from 'react'
import { ComplexDetailedHouse } from '@/types/Complex'
import ObjectsList from '@/page-components/complex/LayoutChoice/ObjectsList'

interface LayoutListProps {
  houses: ComplexDetailedHouse[]
}

function LayoutList({ houses }: LayoutListProps) {
  return houses.map((house) => <ObjectsList {...house} key={house.objects[0].id} />)
}

export default LayoutList
