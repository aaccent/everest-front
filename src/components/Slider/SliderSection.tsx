import React from 'react'
import { getObjects } from '@/globals/api/methods/getObjects'
import Section from '@/layout/Section'
import Slider from '@/components/Slider/Slider'
import Link from 'next/link'

interface SliderSectionProps {
  type: 'newBuildings' | 'catalogNew'
}

async function SliderSection(props: SliderSectionProps) {
  const data = await getObjects(props.type)
  if (!data) return null
  return (
    <Section containerClassName={'relative'}>
      <Link href={'#'}>
        <h2 className='text-header-200 mb-[32px] font-coolvetica uppercase'>{data.title}</h2>
        test
      </Link>
      <Slider list={data.objects} />
    </Section>
  )
}

export default SliderSection
