import React from 'react'
import { getExclusiveOffers } from '@/globals/api/methods/catalog-details/getExclusiveOffers'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import Img from '@/ui/Img'
import bavel from '@/assets/static/decorative-bg/exclusiveOffersBavel.svg'
import mob_bavel from '@/assets/static/decorative-bg/exclusiveOffersBavel_mob.svg'
import logo from '@/assets/static/logo-mini.svg'

interface Offer {
  id: number
  title: string
  text: string
}

export interface ExclusiveOffersType {
  title: string
  items: Offer[]
}

async function ExclusiveOffers() {
  const offersBlock = await getExclusiveOffers()

  function showOffers() {
    return offersBlock.items.map((o) => {
      return (
        <div key={o.id} className='relative w-full rounded-[24px] bg-base-100/10 p-[20px] md:p-[24px]'>
          <div className='mb-[12px] flex w-full justify-between md:mb-[33px]'>
            <div className='text-base-100-reg-100 max-w-[200px] text-base-100'>{o.title}</div>
            <Img src={logo} className='w-full max-w-[32px] opacity-20 md:max-w-[49px]' />
          </div>
          <div className='text-base-100/50'>{o.text}</div>
          <Img src={bavel} className='absolute bottom-0 right-0 hidden filter-primary md:block' />
          <Img src={mob_bavel} className='absolute bottom-0 right-0 filter-primary md:hidden' />
        </div>
      )
    })
  }
  return (
    <DecorativeBlock className='mt-[72px] bg-primary px-[20px] pb-[20px] pt-[33px] md:mt-[160px] md:px-[40px] md:pb-[40px] md:pt-[32px]'>
      <h2 className='text-header-100 mb-[24px] uppercase text-base-100 md:mb-[48px] md:w-full md:max-w-[550px]'>
        {offersBlock.title}
      </h2>
      <div className='flex flex-col gap-[12px] md:grid md:grid-cols-3 md:gap-[18px]'>{showOffers()}</div>
    </DecorativeBlock>
  )
}

export default ExclusiveOffers
