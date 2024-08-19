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
    <Section containerClassName='relative'>
      <div className='md: mb-[32px] flex items-center justify-between'>
        <h2 className='text-header-200 font-coolvetica uppercase'>{props.title}</h2>
        <Link
          href='#'
          className='text-base-500-reg-100-upper flex w-[70px] justify-center gap-[4px] overflow-hidden rounded-[12px] bg-base-300 py-[10px] after:block after:size-[14px] after:rotate-90 after:bg-icon-arrow-up after:filter-base-600 after:bg-default-contain md:hidden'
        >
          все
        </Link>
      </div>
      {showSlider()}
    </Section>
  )
}

export default SliderSection
