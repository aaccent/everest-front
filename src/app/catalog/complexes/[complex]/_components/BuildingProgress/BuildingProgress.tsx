'use client'
import React, { useEffect, useState } from 'react'
import Selector from '@/ui/inputs/Selector'
import { BuildingProgressImage, Period } from '@/globals/api'
import Section from '@/layout/Section'
import TabButtons, { TabButtonItem } from '@/components/TabButtons'
import AlbumsList from '@/app/catalog/complexes/[complex]/_components/BuildingProgress/AlbumsList'

interface Props {
  complexCode: string
}

function BuildingProgress({ complexCode }: Props) {
  const [yearsList, setYearsList] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [albums, setAlbums] = useState<BuildingProgressImage[][]>()
  const [activeQuarter, setActiveQuarter] = useState<Period>()
  const [tabButtons, setTabButtons] = useState<TabButtonItem[]>([])

  useEffect(() => {
    fetch(`/api/${complexCode}/get-years-list`)
      .then((res) => res.json())
      .then((data) => {
        setYearsList(data)
        setSelectedYear(data[0])
      })
  }, [])

  const onYearChange = (name: string, newYear: Array<string>) => {
    setSelectedYear((prev) => {
      if (newYear[0] === prev) return prev
      return newYear[0]
    })
  }

  useEffect(() => {
    if (!selectedYear) return

    fetch(`/api/${complexCode}/get-year-quarters?year=${selectedYear}`)
      .then((res) => res.json())
      .then((res) => {
        setTabButtons(res)
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
    fetch(`/api/${complexCode}/get-albums?quarter=${JSON.stringify(activeQuarter)}`)
      .then((res) => res.json())
      .then((data) => setAlbums(() => Object.values(data)))
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
          {tabButtons.length ? (
            <TabButtons
              list={tabButtons}
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
