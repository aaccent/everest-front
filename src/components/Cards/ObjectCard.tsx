import React from 'react'

import DefaultCard from '@/components/Cards/DefaultCard/DefaultCard'
import NewBuildingCard from '@/components/Cards/NewBuildingCard/NewBuildingCard'

import { ObjectCardProps } from '@/components/Cards/CardsTypes'

function ObjectCard(props: ObjectCardProps) {
  switch (props.type) {
    case 'newInCatalog':
      return <DefaultCard {...props.options} />
    case 'newBuildings':
      return <NewBuildingCard {...props.options} />
  }
}

export default ObjectCard
