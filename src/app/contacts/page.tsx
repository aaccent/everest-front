import React from 'react'
import OfficesMap from '@/app/contacts/_components/OfficesMap/OfficesMap'
import { getLocation } from '@/globals/api'
import Breadcrumbs from '@/components/Breadcrumbs'
import Container from '@/layout/Container'
import { DEFAULT_OFFICES } from '@/app/contacts/_components/OfficesMap/useOfficesMap'

async function Page() {
  const citiesWithOffices = await getLocation({ isOffice: true }).then((location) => location?.cities || [])
  const id = citiesWithOffices?.[0]?.id || '1'
  //await getOffices(Number(id))
  return (
    <>
      <Breadcrumbs list={[{ seo: 'contacts', name: 'Контакты' }]} />
      <Container>
        <OfficesMap cities={citiesWithOffices} offices={DEFAULT_OFFICES} />
      </Container>
    </>
  )
}

export default Page
