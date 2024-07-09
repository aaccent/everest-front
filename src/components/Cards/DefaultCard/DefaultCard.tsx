import React from 'react'
import { Default } from '@/components/Cards/CardsTypes'

function DefaultCard(props: Default) {
  return <div>{props.name}</div>
}

export default DefaultCard
