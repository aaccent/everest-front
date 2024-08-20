import React from 'react'
import Section from '@/layout/Section'
import Container from '@/layout/Container'
import SelectorInline from '@/ui/inputs/SelectorInline'
import Button from '@/ui/buttons/Button'
import { DetailComplex } from '@/types/Complex'
import LayoutInner from '@/page-components/complex/LayoutChoice/LayoutInner'
import LayoutList from '@/page-components/complex/LayoutChoice/LayoutList'
import LayoutTypes from '@/page-components/complex/LayoutChoice/LayoutTypes'
import Selector from '@/ui/inputs/Selector'

interface LayoutChoiceProps {
  complex: DetailComplex
}

function LayoutChoice({ complex }: LayoutChoiceProps) {
  return (
    <Section hideContainer>
      <h2 className='text-header-200 mb-[32px] font-coolvetica uppercase'>Выбор планировки</h2>
      <Container className='mb-[40px] hidden justify-between rounded-[32px] bg-base-200 md:flex md:px-[32px] md:py-[32px]'>
        <SelectorInline list={['Студия', 1, 2, 3, 4]} className='rounded-[16px] bg-base-100' />
        <Selector
          title='Тип недвижимости'
          values={['квартира', 'комната', 'малосемейка', 'общежитие', 'коммуналка']}
          name='type'
        />
        <Button variation='primary' size='small' text='Показать 442 объекта' />
      </Container>
      <LayoutInner listView={<LayoutList complex={complex} />} typeView={<LayoutTypes />} />
    </Section>
  )
}

export default LayoutChoice
