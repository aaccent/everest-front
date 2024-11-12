import React from 'react'
import { RealtorPage } from '@/types/Page'

function Page({ params }: RealtorPage) {
  return <div>{params.realtorCode}</div>
}

export default Page
