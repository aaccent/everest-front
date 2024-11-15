import React from 'react'
import { RealtorDetailed } from '@/types/Realtor'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import Img from '@/ui/Img'
import Section from '@/layout/Section'
import { yearPlural } from '@/features/utility/pluralRules'
import Link from 'next/link'

function formatExperience(value: string) {
  const currentYear = new Date().getFullYear()
  const startYear = new Date(value).getFullYear()
  return currentYear - startYear
}

function MainHero({ ...realtor }: RealtorDetailed) {
  function showParams() {
    return Object.entries(realtor.params).map(([key, value], index) => {
      if (key === 'experience') {
        const _value = formatExperience(value)
        return <div className='before:bg-icon-suitcase' key={index}>{`Опыт ${_value} ${yearPlural.get(_value)}`}</div>
      }
      return (
        <div className='before:bg-icon-address' key={index}>
          {value}
        </div>
      )
    })
  }

  function showSocials() {
    return realtor.socials?.map((social) => {
      return (
        <Link
          key={social.link}
          href={social.link}
          className='flex size-[48px] items-center justify-center rounded-full border border-base-400 md:size-[56px]'
        >
          <Img src={social.icon} width={24} height={24} className='filter-base-600' />
        </Link>
      )
    })
  }

  return (
    <Section className='!md:mt-[30px] !mt-[32px]'>
      <div className='flex flex-col gap-[16px] md:flex-row'>
        <DecorativeBlock type='small' className='w-full max-w-full md:max-w-[776px]'>
          {realtor.image ? (
            <Img
              src={realtor.image}
              width={776}
              height={643}
              className='min-h-[410px] w-full object-cover object-center md:min-h-[643px]'
            />
          ) : (
            <div className='size-full bg-base-500' />
          )}
        </DecorativeBlock>
        <DecorativeBlock type='small' className='h-fit w-full bg-base-200 md:min-h-[643px]'>
          <div className='flex size-full min-h-[inherit] flex-col p-[24px] md:pb-[50px] md:pl-[50px] md:pr-[69px] md:pt-[60px]'>
            <div>
              <div className='text-base-200-lg-100 mb-[4px] text-base-650 md:mb-[12px]'>{realtor.position}</div>
              <h1 className='text-header-200 mt:mb-[24px] mb-[16px] uppercase'>{realtor.name}</h1>
              <div className='text-base-400-lg-100 flex gap-[8px] *:flex *:gap-[4px] *:text-nowrap *:rounded-[10px] *:bg-base-100 *:px-[8px] *:py-[5px] *:before:block *:before:size-[16px] *:before:filter-base-600 *:before:bg-default-auto *:md:gap-[6px] *:md:px-[12px] *:md:py-[6px]'>
                {showParams()}
              </div>
              <div className='text-base-200-lg-100 mt-[24px] text-base-650 md:mt-[32px]'>{realtor.description}</div>
            </div>
            <div className='text-base-100-lg-100 mt-auto'>
              <div className='mb-[8px] mt-[24px] flex items-center gap-[8px] before:block before:size-[28px] before:bg-icon-phone before:filter-base-600 before:bg-default-contain md:mb-[14px] md:mt-0 md:gap-[12px]'>
                {realtor.tel}
              </div>
              <div className='flex items-center gap-[8px] before:block before:size-[28px] before:bg-icon-email before:filter-base-600 before:bg-default-contain md:gap-[12px]'>
                {realtor.email}
              </div>
              <div className='mt-[24px] flex gap-[8px] md:mt-[30px]'>{showSocials()}</div>
            </div>
          </div>
        </DecorativeBlock>
      </div>
    </Section>
  )
}

export default MainHero
