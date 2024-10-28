import { BuildingProgressImage } from '@/globals/api'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import Img from '@/ui/Img'
import React, { useContext } from 'react'
import Carousel, { CarouselInner, CarouselSlide } from '@/components/Carousel/Carousel'
import { PopupContext } from '@/features/Popup'
import moment from 'moment'
import 'moment/locale/ru'
import { photosPlural } from '@/features/utility/pluralRules'

interface Props {
  albums: BuildingProgressImage[][]
}

function AlbumsList({ albums }: Props) {
  const { openPopup } = useContext(PopupContext)
  function showAlbums() {
    return albums.map((album) => {
      const formattedDate = moment(album[0].date).format('D MMMM YYYY').toString()
      const photosList: BuildingProgressImage['image'][] = album.map((photo) => photo.image)
      return (
        <CarouselSlide className='pr-[12px] md:basis-1/2 md:pr-[16px]' key={album[0].date}>
          <DecorativeBlock type='small' key={album[0].date.toString()} className='h-[344px] w-full md:h-[560px]'>
            <Img
              src={album[0].image}
              width={776}
              height={560}
              className='absolute inset-0 size-full object-cover object-center'
            />
            <button
              className='absolute inset-x-[10px] bottom-[10px] flex items-center justify-between rounded-[24px] bg-base-100 py-[16px] pl-[20px] pr-[16px] md:inset-x-[24px] md:bottom-[24px] md:rounded-[32px] md:pl-[24px]'
              onClick={() =>
                openPopup({
                  name: 'galleryPopup',
                  args: {
                    list: photosList,
                  },
                })
              }
            >
              <div>
                <div className='text-header-400'>{formattedDate}</div>
                <div className='text-base-300-lg-100 mt-[6px] text-left text-base-650 md:mt-[8px]'>{`${album.length} ${photosPlural.get(album.length)}`}</div>
              </div>
              <div className='flex -rotate-45 items-center justify-center bg-base-300 circle-[52px] after:block after:size-full after:bg-icon-full-arrow after:filter-primary after:bg-default-auto md:circle-[82px]' />
            </button>
          </DecorativeBlock>
        </CarouselSlide>
      )
    })
  }
  return (
    <Carousel className='mt-[40px]'>
      <CarouselInner>{showAlbums()}</CarouselInner>
    </Carousel>
  )
}

export default AlbumsList
