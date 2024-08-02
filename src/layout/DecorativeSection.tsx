import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import Section from '@/layout/Section'

import DecorativeBg from '@/assets/static/decorative-bg/decorative-bg.svg'
import DecorativeBgMobile from '@/assets/static/decorative-bg/decorative-bg-mobile.svg'
import DecorativeSmallBg from '@/assets/static/decorative-bg/decorative-bg-small.svg'
import DecorativeSmallBgMobile from '@/assets/static/decorative-bg/decorative-bg-small-mobile.svg'

interface BGProps {
  className?: string
  small?: boolean
}

function DecorativeBackgroundImage({ small, className }: BGProps) {
  if (small)
    return (
      <>
        <Image
          className={`block md:hidden ${className}`}
          src={DecorativeSmallBgMobile}
          fill
          alt=''
          role='presentation'
        />
        <Image className={`hidden md:block ${className}`} src={DecorativeSmallBg} fill alt='' role='presentation' />
      </>
    )

  return (
    <>
      <Image className={`block md:hidden ${className}`} src={DecorativeBgMobile} fill alt='' role='presentation' />
      <Image className={`hidden md:block ${className}`} src={DecorativeBg} fill alt='' role='presentation' />
    </>
  )
}

interface Props extends PropsWithChildren {
  title?: string
  titleClassName?: string
  className?: string
  /** @description Отразить по горизонтали декоративный фон */
  reverse?: boolean
  /** @description Вторая вариация декоративного фона. Пример использования на странице Объекта */
  small?: boolean
}

function DecorativeSection({ title, titleClassName, className, reverse, small, children }: Props) {
  const addContainerClassName = [
    // prettier-ignore
    title ? 'md:px-[40px]' : 'pt-[95px]',
    reverse ? 'scale-x-100 md:-scale-x-100 ' : '',
    className,
  ].join(' ')

  return (
    <Section containerClassName={`relative pt-[33px] pb-[22px] px-[19px] rounded-[24px] ${addContainerClassName}`}>
      <DecorativeBackgroundImage
        className='pointer-events-none absolute right-0 top-[-1px] z-10 !h-auto'
        small={small}
      />
      {title && (
        <h2
          className={`text-header-100 mb-[18px] max-w-[500px] uppercase text-base-100 md:mb-[48px] ${titleClassName}`}
        >
          {title}
        </h2>
      )}
      {children}
    </Section>
  )
}

export default DecorativeSection
