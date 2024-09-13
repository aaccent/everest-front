import React from 'react'
import { DetailSecondaryObject } from '@/types/DetailSecondaryObject'
import Section from '@/layout/Section'
import ObjectPropertiesWrapper from '@/app/catalog/_components/ObjectDetail/ObjectProperties/ObjectPropertiesWrapper'
import PropItem from '@/app/catalog/_components/ObjectDetail/PropItem'
import { formatDate } from '@/features/date'
import { Characteristic } from '@/types/Characteristic'

interface Props {
  item: DetailSecondaryObject
}

function Properties({ item }: Props) {
  function showSubList(list: Characteristic[]) {
    return list.map((item, index) => (
      <PropItem key={index} title={item.name}>
        {item.value}
      </PropItem>
    ))
  }

  function showList() {
    return item.characteristics.map((prop, index) => (
      <div className='w-full md:max-w-[370px]' key={index}>
        <div className='text-base-300-reg-100-upper mb-[16px] first:mt-0'>{prop.name}</div>
        <ul className='flex flex-col gap-[10px]'>{showSubList(prop.characteristics)}</ul>
      </div>
    ))
  }

  return <div className='flex flex-col gap-[20px] md:flex-row md:gap-[52px]'>{showList()}</div>
}

function Description({ item }: Props) {
  return (
    <>
      <div className='mb-[24px] flex gap-[4px]'>
        <span className='text-base-400-lg-100 rounded-[10px] bg-base-100 px-[12px] py-[6.5px]'>
          {formatDate(item.publicationTime)}
        </span>
      </div>
      <div className='maw-w-[865px]'>{item.text}</div>
    </>
  )
}

export const OBJECT_PROPS_ID = 'object-properties'

function ObjectProperties({ item }: Props) {
  return (
    <Section id={OBJECT_PROPS_ID}>
      <ObjectPropertiesWrapper
        propsTabContent={<Properties item={item} />}
        descTabContent={<Description item={item} />}
      />
    </Section>
  )
}

export default ObjectProperties
