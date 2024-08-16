import React from 'react'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
import Container from '@/layout/Container'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import SelectorInline from '@/ui/inputs/SelectorInline'
import CatalogViewButton from '@/components/QuickFilter/CatalogViewButton'
import { AnyCategory } from '@/types/Category'
import { flatPlural } from '@/features/pluralRules'
import Range from '@/ui/inputs/Range'
import FilterSelect from '@/ui/FilterSelect'

interface Props {
  category: AnyCategory
}

function QuickFilter({ category }: Props) {
  const amount = category.objects.length

  return (
    <Container>
      <div className='mb-[32px] mt-[40px] flex items-center justify-between rounded-[24px] bg-base-200 p-[20px] md:w-full md:flex-col md:items-start md:justify-start md:p-[32px] md:pb-[18px]'>
        <div className='flex w-full items-center justify-between md:hidden'>
          <DetailFilterButton />
          <span className='text-base-300-lg-100 text-base-600/50'>
            Найдено {amount} {flatPlural.get(amount)}
          </span>
          <MapObjectsButton />
        </div>
        <div className='hidden w-full items-center border-b border-b-base-600/10 pb-[24px] md:flex'>
          <DetailFilterButton className='mr-[16px]' />
          <div className='flex gap-[16px]'>
            <SelectorInline list={['Студия', 1, 2, 3, '4+']} />
            <Range min={1} max={17.7} units='млн.₽' />
            <Range min={11} max={127} units='м2' />
            <FilterSelect values={['1', '3', '5']} defaultValue='Этаж' />
          </div>
          <MapObjectsButton className='ml-auto' />
        </div>
        <div className='hidden w-full items-center pt-[17px] md:flex'>
          <div className='text-base-500-reg-100-upper'>
            <span className='mr-[6px] text-base-600/50'>Сортировка:</span>
            <button className='text-base-500-reg-100-upper'>по умолчанию</button>
          </div>
          <button
            className='text-base-500-reg-100-upper ml-auto mr-[30px] flex items-center gap-[8px] before:size-[22px] before:bg-icon-search-favorite before:bg-default'
            type='button'
          >
            Сохранить поиск
          </button>
          <CatalogViewButton />
        </div>
      </div>
    </Container>
  )
}

export default QuickFilter
