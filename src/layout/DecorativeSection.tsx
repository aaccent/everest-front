import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import Section from '@/layout/Section'
import DecorativeSubtract from '@/assets/static/decorative-bg.svg'
import DecorativeSubtractMobile from '@/assets/static/decorative-bg-mobile.svg'

interface Props extends PropsWithChildren {
  title?: string
  titleClassName?: string
  className?: string
}

function DecorativeSection({ title, titleClassName, className, children }: Props) {
  return (
    <Section
      containerClassName={`relative pt-[33px] pb-[22px] px-[19px] rounded-[24px] ${title ? 'md:px-[40px]' : 'pt-[95px]'} ${className}`}
    >
      <Image
        className='absolute top-[-1px] right-0 z-10 w-full h-[38px] pointer-events-none md:hidden'
        src={DecorativeSubtractMobile}
        role='presentation'
        alt=''
      />
      <Image
        className='absolute top-[-1px] right-0 z-10 hidden pointer-events-none md:w-full md:h-[93px] object-contain md:block'
        src={DecorativeSubtract}
        role='presentation'
        alt=''
      />
      {title && (
        <h2
          className={`max-w-[500px] mb-[18px] text-base-100 text-header-100 uppercase md:mb-[48px] ${titleClassName}`}
        >
          {title}
        </h2>
      )}
      {children}
    </Section>
  )
}

export default DecorativeSection
