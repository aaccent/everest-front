import React from 'react'
import { RealtorDetailed } from '@/types/Realtor'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import Img from '@/ui/Img'
import Section from '@/layout/Section'
import { yearPlural } from '@/features/utility/pluralRules'

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
        return <div key={index}>{`Опыт ${_value} ${yearPlural.get(_value)}`}</div>
      }
      return <div key={index}>{value}</div>
    })
  }

  showParams()
  return (
    <Section className='!md:mt-[30px] !mt-[32px]'>
      <div className='flex flex-col gap-[16px] md:flex-row'>
        <DecorativeBlock
          type='small'
          className='h-[410px] w-full max-w-full md:h-full md:min-h-[643px] md:max-w-[776px]'
        >
          {realtor.image ? (
            <Img src={realtor.image} width={776} height={643} className='size-full object-cover object-center' />
          ) : (
            <div className='size-full bg-base-500' />
          )}
        </DecorativeBlock>
        <DecorativeBlock type='small' className='h-fit w-full md:min-h-[643px]'>
          <div className='size-full bg-base-200 p-[24px] md:pb-[50px] md:pl-[50px] md:pr-[69px] md:pt-[60px]'>
            <div>{realtor.position}</div>
            <div>{realtor.name}</div>
            <div>{showParams()}</div>
            <div>{realtor.description}</div>
          </div>
        </DecorativeBlock>
      </div>
    </Section>
  )
}

export default MainHero
