import React from 'react'
import Link from 'next/link'
import Section from '@/layout/Section'
import { getLinks } from '@/globals/api/methods/getLinks'
import Image from 'next/image'
import bavel from '@/assets/static/usefull-links-bavel.svg'
import Carousel, { CarouselSlide } from '@/components/Carousel/Carousel'

interface Link {
  id: string
  url: string
  name: string
  objectAmount: string
}

interface Category {
  categoryName: string
  categoryIcon: string
  linksList: Link[]
}

function showLinks(links: Link[]) {
  return links.map((link) => {
    return (
      <Link href={link.url} key={link.id} className='flex items-center justify-between'>
        <div className='text-base-300-reg-200'>{link.name}</div>
        <div className='text-base-200-med-100 text-primary'>{link.objectAmount}</div>
      </Link>
    )
  })
}

function showCategories(categories: Category[]) {
  return categories.map((category, index) => {
    return (
      <CarouselSlide
        className='mr-[12px] max-w-[292px] md:mr-0 md:max-w-none md:basis-1/4 md:pr-[16px] md:last:pr-0'
        key={index}
      >
        <div className='relative h-full rounded-[24px] bg-base-200 p-[24px] md:rounded-[32px] md:px-[32px] md:pb-[40px] md:pt-[32px]'>
          <Image src={bavel} alt='#' className='absolute right-0 top-0' />
          <div className='mb-[20px] flex items-center gap-[16px] md:mb-[40px]'>
            <div className='flex size-[60px] items-center justify-center rounded-[16px] bg-base-100 md:size-[80px]'>
              <Image src={category.categoryIcon} alt='' width={24} height={24} className='md:size-[42px]' />
            </div>
            <div className='text-header-400'>{category.categoryName}</div>
          </div>
          <div className='text-base-300-reg-200 flex flex-col gap-[14px] md:gap-[18px]'>
            {showLinks(category.linksList)}
          </div>
        </div>
      </CarouselSlide>
    )
  })
}

async function UsefulLinks() {
  const data = await getLinks()

  return (
    <Section containerClassName='usefull'>
      <h2 className='text-header-200 mb-[24px] uppercase md:mb-[40px]'>Полезные ссылки</h2>
      <Carousel>{showCategories(data)}</Carousel>
    </Section>
  )
}

export default UsefulLinks
