import React from 'react'
import Section from '@/layout/Section'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import DocumentationWrapperWithButton from '@/app/catalog/complexes/[complex]/_components/Documentation/DocumentationWrapperWithButton'
import Link from 'next/link'

interface DocsType {
  id: number
  title: string
  size: string
  format: string
  link: string
}

const textDocs = [
  {
    id: 1,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
  {
    id: 2,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
  {
    id: 3,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
  {
    id: 4,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
  {
    id: 5,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
  {
    id: 6,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
  {
    id: 7,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
  {
    id: 8,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
  {
    id: 9,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
  {
    id: 10,
    title: 'Проектная декларация №72-3243434',
    size: '0.72',
    format: 'pdf',
    link: '#',
  },
]

function Documentation() {
  function showLinks() {
    return textDocs.map((d) => {
      return (
        <Link
          href={d.link}
          key={d.id}
          className='text-base-300-lg-100 flex flex-col gap-[8px] rounded-[20px] bg-base-100 p-[20px] md:flex-row md:justify-between md:gap-0 md:rounded-[24px]'
        >
          <div>{d.title}</div>
          <div className='flex items-center justify-between md:justify-start md:gap-[16px]'>
            <div className='text-base-650'>
              {d.size}, {d.format}
            </div>
            <div className='flex items-center justify-center bg-primary circle-[24px] after:block after:size-[14px] after:rotate-180 after:bg-icon-arrow-up after:bg-default-contain' />
          </div>
        </Link>
      )
    })
  }
  return (
    <Section>
      <DecorativeBlock className='px-container bg-base-200 pb-[20px] pt-[33px] md:pb-[40px]'>
        <h2 className='text-header-200 mb-[24px] uppercase md:mb-[48x] md:max-w-[446px]'>Документация проекта</h2>
        <DocumentationWrapperWithButton className='grid gap-[8px] md:grid-cols-2 md:gap-[18px] [&>*:nth-child(n+6)]:hidden group-[.active]/docs:[&>*:nth-child(n+6)]:flex md:[&>*:nth-child(n+6)]:flex md:group-[.active]/docs:[&>*:nth-child(n+6)]:flex md:[&>*:nth-child(n+9)]:hidden md:group-[.active]/docs:[&>*:nth-child(n+9)]:flex'>
          {showLinks()}
        </DocumentationWrapperWithButton>
      </DecorativeBlock>
    </Section>
  )
}

export default Documentation
