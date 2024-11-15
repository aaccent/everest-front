'use client'

import React, { useState } from 'react'
import Search from '@/ui/inputs/Search'
import RealtorCard from '@/app/realtors/_components/RealtorCard'
import { getRealtorsList } from '@/globals/api/methods/realtors/getRealtorsList'
import { RealtorCardType } from '@/types/Realtor'

interface RealtorsListProps {
  initList: RealtorCardType[]
}

function showRealtors(list: RealtorCardType[]) {
  return list.map((realtor) => {
    return <RealtorCard {...realtor} key={realtor.id} />
  })
}

function RealtorsList({ initList }: RealtorsListProps) {
  const [list, setList] = useState<RealtorCardType[]>(initList)

  const onSearchInputChange = (value: string) => {
    getRealtorsList(value).then((res) => setList(res))
  }

  return (
    <>
      <Search placeholder='Найти по имени или фамилии' onChange={onSearchInputChange} />
      <div className='mt-[32px] grid gap-y-[32px] md:mt-[40px] md:grid-cols-4 md:gap-x-[16px] md:gap-y-[40px]'>
        {showRealtors(list)}
      </div>
    </>
  )
}

export default RealtorsList
