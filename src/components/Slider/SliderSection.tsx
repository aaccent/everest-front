import React from 'react'
import Section from '@/layout/Section'
import Slider, { SliderProps } from '@/components/Slider/Slider'
import Link from 'next/link'

type Props = SliderProps & {
  title: string
}

async function SliderSection(props: Props) {
  function showSlider() {
    switch (props.type) {
      case 'complex':
        return <Slider type={props.type} list={props.list} />
      case 'objects':
        return <Slider type={props.type} list={props.list} />
      default:
        null
    }
  }

  return (
    <Section containerClassName='relative' hideContainer>
      <Link href='#'>
        <h2 className='text-header-200 mb-[32px] font-coolvetica uppercase'>{props.title}</h2>
      </Link>
      {showSlider()}
    </Section>
  )
}

export default SliderSection
