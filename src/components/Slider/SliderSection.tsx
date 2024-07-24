import React from 'react'
import Section from '@/layout/Section'
import Slider from '@/components/Slider/Slider'
import Link from 'next/link'
import { Complex } from '@/types/Complex'

interface SliderSectionProps {
  data: Complex[] //позднее добавятся типы карточек Объектов и Новостроек
  title: string
}

async function SliderSection(props: SliderSectionProps) {
  return (
    <Section containerClassName={'relative'}>
      <Link href={'#'}>
        <h2 className='text-header-200 mb-[32px] font-coolvetica uppercase'>{props.title}</h2>
      </Link>
      <Slider list={props.data} />
    </Section>
  )
}

export default SliderSection
