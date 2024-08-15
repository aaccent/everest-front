import React from 'react'
import Container from '@/layout/Container'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'

async function FilterPopup() {
  return (
    <div className='relative mt-[64px] h-[1200px] rounded-t-[24px] bg-base-100'>
      <Container className='py-[24px]'>
        <div className='flex items-center justify-between'>
          <MapObjectsButton />
          <div className='text-header-300'>Фильтры</div>
          <ClosePopupButton />
        </div>
      </Container>
    </div>
  )
}

export default FilterPopup
