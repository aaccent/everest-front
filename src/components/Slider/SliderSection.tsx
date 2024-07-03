import React, { PropsWithChildren, ReactNode } from 'react'
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
        <h2 className='mb-[32px] text-header-200 font-coolvetica uppercase'>{data.title}</h2>
      </Link>
      <Slider list={data.objects} />
    </Section>
  )
}

export default SliderSection
