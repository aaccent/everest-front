import React from 'react'
import Section from '@/layout/Section'
import CompareContent from '@/app/compare/_components/CompareContent'

function Page() {
  return (
    <Section className='md:mx-auto md:max-w-[838px] md:!px-0' hideContainer>
      <CompareContent />
    </Section>
  )
}

export default Page
