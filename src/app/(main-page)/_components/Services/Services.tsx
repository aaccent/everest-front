import React from 'react'
import DecorativeSection from '@/layout/DecorativeSection'
import { getServices } from '@/globals/api'
import Image from 'next/image'
import Link from 'next/link'
import ServicesWrapperWithButton from '@/app/(main-page)/_components/Services/ServicesWrapperWithButton'

interface Service {
  id: string
  title: string
  code: string
  icon: string
}

function showServices(services: Service[]) {
  return (
    <>
      {services.map((service) => (
        <Link
          className='group relative mb-[8px] flex items-center rounded-[32px] bg-base-100/10 p-[18px] md:mb-0 md:p-[24px]'
          href={service.code}
          key={service.id}
        >
          <div className='mr-[14px] flex size-[52px] shrink-0 items-center justify-center rounded-full bg-base-115 md:mr-[20px] md:size-[80px]'>
            <Image className='size-[22px] md:size-[34px]' src={service.icon} alt='' width={34} height={34} />
          </div>
          <div className='w-full max-w-[136px] md:max-w-full'>{service.title}</div>
          <div className='absolute right-[18px] flex size-[52px] items-center justify-center rounded-full border border-base-115 after:block after:size-[20px] after:rotate-45 after:bg-icon-arrow-up after:filter-base-100 after:bg-default group-hover:border-base-100 group-hover:bg-base-100 group-hover:after:filter-primary md:right-[24px] md:size-[80px]'></div>
        </Link>
      ))}
    </>
  )
}

async function Services() {
  const services = await getServices()

  return (
    <DecorativeSection className='bg-primary text-base-100 md:pb-[40px]' title='сервисы нашего агентства'>
      <ServicesWrapperWithButton
        servicesLength={services.length - 3}
        className='grid gap-[8px] md:grid-cols-2 md:gap-[24px] [&>*:nth-child(n+4)]:hidden group-[.active]/services:[&>*:nth-child(n+4)]:flex md:[&>*:nth-child(n+4)]:flex'
      >
        {showServices(services)}
      </ServicesWrapperWithButton>
    </DecorativeSection>
  )
}

export default Services
