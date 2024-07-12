import React from 'react'
import { Default } from '@/components/Cards/CardsTypes'
import CarouselInSlide from '@/components/Carousel/CarouselInSlide'
import { formatTime } from '@/features/date'
import { formatSpacedPrice } from '@/features/price'

function DefaultCard(props: Default) {
  function showParams() {
    return (
      <div className={`mb-[8px] flex items-center gap-[6px] md:mb-[12px]`}>
        {props.params.map((param) => (
          <div
            className={`text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[8px]`}
            key={props.id}
          >
            {param}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='flex h-auto flex-col'>
      <div className='relative mb-[18px] h-[210px] overflow-hidden rounded-[10px] md:mb-[22px] md:h-[340px] md:rounded-[20px]'>
        <CarouselInSlide photos={props.photos} photoAmount={props.photoAmount} tags={props.tags} />
      </div>
      <div className={`text-header-400 mb-[12px] md:mb-[14px]`}>{`${formatSpacedPrice(props.price)} ₽`}</div>
      {showParams()}
      <div className={`text-base-300-lg-100 flex items-center gap-[9px] text-base-650 md:gap-[11px]`}>
        <div
          className={`flex items-center gap-[8px] before:block before:h-[15px] before:w-[12px] before:bg-icon-address before:bg-auto before:bg-center before:bg-no-repeat before:opacity-50`}
        >
          {props.address}
        </div>
        <div className={`size-[4px] rounded-full bg-base-650`}></div>
        <div
          className={`flex items-center gap-[4px] before:block before:size-[19px] before:bg-icon-clip before:bg-auto before:bg-center before:bg-no-repeat before:opacity-50`}
        >
          {formatTime(props.time)}
        </div>
      </div>
    </div>
  )
}

export default DefaultCard
