'use client'
import React, { useEffect, useState } from 'react'
import Selector from '@/ui/inputs/Selector'
import { BuildingProgressPart as Album, getBuildingProgress, QuarterRequest } from '@/globals/api'
import Section from '@/layout/Section'
import TabButtons, { TabButtonsProps } from '@/components/TabButtons'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import Img from '@/ui/Img'

const testData = [2021, 2022, 2023]

function getQuarters(year: number | string): QuarterRequest[] {
  return [
    {
      dateFrom: `${year}-01-01`,
      dateTo: `${year}-03-31`,
    },
    {
      dateFrom: `${year}-04-01`,
      dateTo: `${year}-06-30`,
    },
    {
      dateFrom: `${year}-07-01`,
      dateTo: `${year}-09-30`,
    },
    {
      dateFrom: `${year}-10-01`,
      dateTo: `${year}-12-31`,
    },
  ]
}

interface AlbumsProps {
  albums: Album[]
}

function Albums({ albums }: AlbumsProps) {
  function showAlbums() {
    return albums.map((album) => {
      return (
        <DecorativeBlock type='small' key={album.date.toString()}>
          <Img src={album.image} width={776} height={560} className='size-full object-cover object-center' />
        </DecorativeBlock>
      )
    })
  }

  return <div className='mt-[40px] grid grid-cols-2 gap-[16px]'>{showAlbums()}</div>
}

interface Props {
  complexCode: string
}

function BuildingProgress({ complexCode }: Props) {
  const [year, setYear] = useState<number | string>(testData[0])
  const [albums, setAlbums] = useState<Album[]>()
  const [activeQuarter, setActiveQuarter] = useState<QuarterRequest>()
  const [tabButtons, setTabButtons] = useState<TabButtonsProps['list']>([])

  const onYearChange = (name: string, newYear: Array<string | number>) => {
    setYear((prev) => {
      if (newYear[0] === prev) return prev
      return newYear[0]
    })
  }

  function convertQuartersToTabButtonsProp(quarters: QuarterRequest[]) {
    return quarters.map(async (quarter, index) => {
      const album = await getBuildingProgress({ complexCode, ...quarter })
      return {
        text: `${index + 1} квартал`,
        value: JSON.stringify(quarter),
        disabled: !album.length,
      }
    })
  }

  useEffect(() => {
    const quarters = getQuarters(year)
    setActiveQuarter(quarters[0])
    Promise.all(convertQuartersToTabButtonsProp(quarters)).then((res) => setTabButtons(res))
    getBuildingProgress({ complexCode, ...quarters[0] }).then((res) => setAlbums(res))
  }, [year])

  const onQuarterChange = (value: string) => {
    const quarter = JSON.parse(value)
    setActiveQuarter(quarter)
    getBuildingProgress({ complexCode, ...quarter }).then((res) => setAlbums(res))
  }

  useEffect(() => {}, [activeQuarter])

  return (
    <Section>
      <div className='flex flex-col items-end gap-[32px] md:flex-row md:items-start md:justify-between md:gap-0'>
        <h2 className='text-header-200 uppercase'>Ход строительства</h2>
        <div className='flex flex-col items-center gap-[16px] md:flex-row md:gap-[40px]'>
          <Selector
            name='building-progress-year'
            title=''
            showTitle={false}
            list={testData}
            isRadio
            value={[year]}
            onChange={onYearChange}
            className='md:w-[334px]'
          />
          {tabButtons.length ? (
            <TabButtons
              list={tabButtons}
              onChange={onQuarterChange}
              defaultActiveValue={JSON.stringify(activeQuarter)}
            />
          ) : null}
        </div>
      </div>
      {albums ? <Albums albums={albums} /> : null}
    </Section>
  )
}

export default BuildingProgress
