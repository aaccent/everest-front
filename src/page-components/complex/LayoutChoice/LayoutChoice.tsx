import React from 'react'
import Section from '@/layout/Section'
import Container from '@/layout/Container'
import Button from '@/ui/buttons/Button'
import { DetailComplex } from '@/types/Complex'
import LayoutInner from '@/page-components/complex/LayoutChoice/LayoutInner'
import LayoutTypes from '@/page-components/complex/LayoutChoice/LayoutTypes'
import { LayoutContextProvider } from './LayoutListContext'
import ObjectsTable from './ObjectsTable'

interface LayoutChoiceProps {
  complex: DetailComplex
}

function LayoutChoice({ complex }: LayoutChoiceProps) {
  return (
    <Section>
      <h2 className='text-header-200 mb-[32px] font-coolvetica uppercase'>Выбор планировки</h2>
      <Container className='mb-[40px] hidden justify-between rounded-[32px] bg-base-200 md:flex md:px-[32px] md:py-[32px]'>
        <Button variation='primary' size='small' text='Показать 442 объекта' />
      </Container>
      <LayoutContextProvider>
        <LayoutInner listView={<ObjectsTable complex={complex} />} typeView={<LayoutTypes />} />
      </LayoutContextProvider>
    </Section>
  )
}

export default LayoutChoice
