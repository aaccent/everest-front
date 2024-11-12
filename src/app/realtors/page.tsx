import React from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Section from '@/layout/Section'
import RealtorsList from '@/app/realtors/_components/RealtorsList'
import { getRealtorsList } from '@/globals/api/methods/realtors/getRealtorsList'

async function Page() {
  const realtorsList = await getRealtorsList()
  return (
    <>
      <Breadcrumbs list={[{ seo: 'realtors', name: 'Риелторы' }]} />
      <Section>
        <div className='mb-[16px] flex items-start justify-between md:mb-[32px]'>
          <h1 className='text-header-100 uppercase'>Риелторы</h1>
          <div className='text-base-300-lg-100 hidden text-base-650 md:block'>Найдено 112 риелторов</div>
        </div>
        <RealtorsList initList={realtorsList} />
      </Section>
    </>
  )
}

export default Page
