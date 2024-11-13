import React from 'react'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import Img from '@/ui/Img'
import RealtorTel from '@/app/realtors/_components/RealtorTel'
import Link from 'next/link'
import { createRealtorLink } from '@/features/link'
import { RealtorCardType } from '@/types/Realtor'

function RealtorCard({ ...realtor }: RealtorCardType) {
  const link = createRealtorLink(realtor.code)
  return (
    <Link href={link} className='flex flex-col gap-[16px] md:gap-[20px]'>
      <DecorativeBlock type='small'>
        {realtor.image ? (
          <Img
            src={realtor.image}
            width={380}
            height={448}
            className='h-[410px] w-full max-w-[350px] object-cover object-center md:h-[448px] md:max-w-[380px]'
          />
        ) : (
          <div className='h-[410px] w-full max-w-[350px] bg-base-600/10 md:h-[448px] md:max-w-[380px]' />
        )}
        <RealtorTel tel={realtor.tel} />
      </DecorativeBlock>
      <div className='flex flex-col gap-[4px] md:gap-[8px]'>
        <div className='text-base-200-lg-100 text-base-650'>{realtor.position}</div>
        <div className='text-base-100-reg-100'>{realtor.name}</div>
      </div>
    </Link>
  )
}

export default RealtorCard
