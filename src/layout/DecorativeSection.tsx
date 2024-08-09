import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import Section from '@/layout/Section'

import DecorativeBg from '@/assets/static/decorative-bg/decorative-bg.svg'
import DecorativeBgMobile from '@/assets/static/decorative-bg/decorative-bg-mobile.svg'
import DecorativeSmallBg from '@/assets/static/decorative-bg/decorative-bg-small.svg'
import DecorativeSmallBgMobile from '@/assets/static/decorative-bg/decorative-bg-small-mobile.svg'
import DecorativeMediumBgMobile from '@/assets/static/decorative-bg/decorative-bg-medium-mobile.svg'

/** 'big' - используется в зеленых секциях, 'medium' на странице объекта, 'small' в риелторах */
type DecorativeBGType = 'small' | 'medium' | 'big'

interface BGProps {
  className?: string
  type?: DecorativeBGType
}

function DecorativeBackgroundImage({ className, type }: BGProps) {
  switch (type) {
    case 'small':
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
    case 'medium':
      return (
        <>
          <Image
            className={`block md:hidden ${className}`}
            src={DecorativeMediumBgMobile}
            fill
            alt=''
            role='presentation'
          />
          <Image className={`hidden md:block ${className}`} src={DecorativeSmallBg} fill alt='' role='presentation' />
        </>
      )
    case 'big':
    default:
      return (
        <>
          <Image className={`block md:hidden ${className}`} src={DecorativeBgMobile} fill alt='' role='presentation' />
          <Image className={`hidden md:block ${className}`} src={DecorativeBg} fill alt='' role='presentation' />
        </>
      )
  }
}

interface InnerProps extends PropsWithChildren {
  title?: string
  className?: string
  titleClassName?: string
  /** @description Вариация декоративного фона. 'big' - используется в зеленых секциях, 'medium' на странице объекта, 'small' в риелторах */
  type?: DecorativeBGType
}

function DecorativeInner({ type, titleClassName, title, children, className }: InnerProps) {
  return (
    <>
      <DecorativeBackgroundImage
        className={`pointer-events-none absolute right-0 top-[-1px] z-10 !h-auto ${className}`}
        type={type}
      />
      {title && (
        <h2
          className={`text-header-100 mb-[18px] max-w-[500px] uppercase text-base-100 md:mb-[48px] ${titleClassName}`}
        >
          {title}
        </h2>
      )}
      {children}
    </>
  )
}

interface Props extends PropsWithChildren, InnerProps {
  className?: string
  decorativeClassName?: string
  /** @description Отразить по горизонтали декоративный фон. По умолчанию горб находится слева. Если true, то горб будет справа */
  reverse?: boolean
}

export default function DecorativeSection({ title, className, decorativeClassName, reverse, ...props }: Props) {
  const sectionClassName = [
    // prettier-ignore
    title ? 'md:px-[40px]' : 'pt-[95px]',
    className,
  ].join(' ')

  return (
    <Section
      containerClassName={`relative pt-[33px] pb-[22px] px-[19px] rounded-[24px] overflow-hidden ${sectionClassName}`}
    >
      {title && (
        <h2 className='text-header-100 mb-[18px] max-w-[500px] uppercase text-base-100 md:mb-[48px]'>{title}</h2>
      )}
      <DecorativeInner className={`${decorativeClassName} ${reverse ? '-scale-x-100' : ''}`} {...props} />
    </Section>
  )
}

export function DecorativeBlock({ className, reverse, decorativeClassName, ...props }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-[24px] ${className}`}>
      <DecorativeInner className={`${decorativeClassName} ${reverse ? '-scale-x-100' : ''}`} {...props} />
    </div>
  )
}
