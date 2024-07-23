import React from 'react'
import Section from '@/layout/Section'
import Slider from '@/components/Slider/Slider'
import Link from 'next/link'
import { getNewBuildingsOnMain } from '@/globals/api/methods/getNewBuildingsOnMain'

interface SliderSectionProps {
  type: 'newBuildings' | 'catalogNew'
}

async function SliderSection(props: SliderSectionProps) {
  let data
  let title

  switch (props.type) {
    case 'newBuildings':
      title = 'Новостройки'
      data = await getNewBuildingsOnMain()
      break

    case 'catalogNew':
      title = 'Новинки в каталоге'
      data = await getNewBuildingsOnMain()
      break
  }

  return (
    <Section containerClassName={'relative'}>
      <Link href={'#'}>
        <h2 className='text-header-200 mb-[32px] font-coolvetica uppercase'>{title}</h2>
      </Link>
      <Slider list={data} />
    </Section>
  )
}

export default SliderSection
