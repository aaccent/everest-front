import React from 'react'
import OfficesMap from '@/app/contacts/_components/OfficesMap/OfficesMap'
import { getLocation } from '@/globals/api'
import Breadcrumbs from '@/components/Breadcrumbs'
import Container from '@/layout/Container'
import { getOffices } from '@/globals/api/methods/geo/getOffices'

async function Page() {
  const citiesWithOffices = await getLocation({ isOffice: true }).then((location) => location.cities)
  const initialOffices = await getOffices(Number(citiesWithOffices[0].id))

  return (
    <>
      <Breadcrumbs list={[{ seo: 'contacts', name: 'Контакты' }]} />
      <Container>
        <OfficesMap cities={citiesWithOffices} offices={initialOffices} />
      </Container>
    </>
  )
}

export default Page
