'use client'
import React, { useEffect, useState } from 'react'
import Selector from '@/ui/inputs/Selector'
import Section from '@/layout/Section'
import TabButtons, { TabButtonItem } from '@/components/TabButtons'
import AlbumsList from '@/app/catalog/complexes/[complex]/_components/BuildingProgress/AlbumsList'
import { BuildingProgressImage, getAlbums, getQuarters, getYearsList, Period } from '@/globals/api'

interface Props {
  complexCode: string
}

function BuildingProgress({ complexCode }: Props) {
  const [yearsList, setYearsList] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [albums, setAlbums] = useState<BuildingProgressImage[][]>()
  const [activeQuarter, setActiveQuarter] = useState<Period>()
  const [quarters, setQuarters] = useState<TabButtonItem[]>([])

  useEffect(() => {
    getYearsList(complexCode).then((data) => {
      setYearsList(data)
      setSelectedYear(data[0])
    })
  }, [])

  const onYearChange = (name: string, newYear: Array<string>) => {
    setSelectedYear(newYear[0])
  }

  useEffect(() => {
    if (!selectedYear) return

    getQuarters(complexCode, selectedYear).then((res) => {
      setQuarters(res)
      const active: TabButtonItem = res.find((quarter: TabButtonItem) => !quarter.disabled)
      setActiveQuarter(JSON.parse(active.value))
    })
  }, [selectedYear])

  const onQuarterChange = (value: string) => {
    const quarter = JSON.parse(value)
    setActiveQuarter(quarter)
  }

  useEffect(() => {
    if (!activeQuarter) return

    getAlbums(complexCode, activeQuarter).then((data) => setAlbums(() => Object.values(data)))
  }, [activeQuarter])

  return (
    <Section>
      <div className='flex flex-col items-start gap-[32px] md:flex-row md:items-end md:justify-between'>
        <h2 className='text-header-200 uppercase'>Ход строительства</h2>
        <div className='flex flex-col items-center gap-[16px] md:flex-row md:gap-[40px]'>
          <Selector
            name='building-progress-year'
            title=''
            showTitle={false}
            list={yearsList}
            isRadio
            value={[selectedYear]}
            onChange={onYearChange}
            className='mt-0 w-[350px] rounded-[20px] border border-base-400 px-[16px] pt-[18px] md:w-[334px]'
          />
          {quarters.length ? (
            <TabButtons
              list={quarters}
              onChange={onQuarterChange}
              defaultActiveValue={JSON.stringify(activeQuarter)}
              className='text-nowrap'
            />
          ) : null}
        </div>
      </div>
      {albums ? <AlbumsList albums={albums} /> : null}
    </Section>
  )
}

export default BuildingProgress
