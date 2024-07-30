import React from 'react'
import DetailFilterButton from '@/layout/CategoryLayout/QuickFilter/DetailFilterButton'
import Container from '@/layout/Container'
import MapObjectsButton from '@/layout/CategoryLayout/QuickFilter/MapObjectsButton'
import SelectorInline from '@/ui/inputs/SelectorInline'

function QuickFilter() {
  return (
    <Container className='mb-[32px] mt-[40px] flex items-center justify-between rounded-[24px] bg-base-200 p-[20px]'>
      <div className='md:hidden'>
        <DetailFilterButton />
        <span>Найдено 112 квартир</span>
        <MapObjectsButton />
      </div>
      <div className='hidden md:flex md:items-center'>
        <DetailFilterButton />
        <div className='flex gap-[16px]'>
          <SelectorInline list={['Студия', 1, 2, 3, '4+']} />
        </div>
        <MapObjectsButton />
      </div>
      <div className='hidden md:flex'></div>
    </Container>
  )
}

export default QuickFilter
