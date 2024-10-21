import React from 'react'
import Selector from '@/ui/inputs/Selector'

const testData = [2021, 2022, 2023]

function BuildingProgress() {
  return (
    <div>
      <Selector name='building-progress-year' title='' showTitle={false} list={testData} />
    </div>
  )
}

export default BuildingProgress
