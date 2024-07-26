import React from 'react'
import DecorativeSection from '@/layout/DecorativeSection'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import { getServices } from '@/globals/api'
import Image from 'next/image'
import MoreServicesButton from '@/components/Services/MoreServicesButton'
import Link from 'next/link'

interface Service {
  id: string
  title: string
  code: string
  icon: string
}

export function showServices(services: Service[]) {
  return (
    <>
      {services.map((service) => (
        <Link
          className='group relative mb-[8px] flex items-center rounded-[32px] bg-base-100/10 p-[18px] md:mb-0 md:p-[24px]'
          href={service.code}
          key={service.id}
        >
          <div className='mr-[14px] flex size-[52px] items-center justify-center rounded-full bg-base-115 md:mr-[20px] md:size-[80px]'>
            <Image src={service.icon} alt='' width={34} height={34} className='size-[22px] md:size-[34px]' />
          </div>
          <div>{service.title}</div>
          <div className='absolute right-[18px] flex size-[52px] items-center justify-center rounded-full border border-base-115 after:block after:size-[20px] after:rotate-45 after:bg-icon-arrow-up after:filter-base-100 after:bg-default group-hover:border-base-100 group-hover:bg-base-100 group-hover:after:filter-primary md:right-[24px] md:size-[80px]'></div>
        </Link>
      ))}
    </>
  )
}

async function Services() {
  const services = await getServices()
  const shownServices = services.slice(0, 3)
  const hiddenServices = services.slice(3, services.length)

  return (
    <DecorativeSection className='bg-primary text-base-100 md:pb-[40px]' title='сервисы нашего агентства'>
      <IsDesktop>
        <div className='grid grid-cols-2 gap-[24px]'>{showServices(services)}</div>
      </IsDesktop>
      <IsMobile>
        <div className=''>
          {showServices(shownServices)}
          <MoreServicesButton hiddenServices={hiddenServices} />
        </div>
      </IsMobile>
    </DecorativeSection>
  )
}

export default Services
