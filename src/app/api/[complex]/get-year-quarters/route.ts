import { ComplexPage } from '@/types/Page'
import { NextRequest } from 'next/server'
import { getBuildingProgress, Period } from '@/globals/api'
import { TabButtonItem } from '@/components/TabButtons'

function convertQuarters(quarters: Period[], complexCode: string) {
  return quarters.map(async (quarter, index) => {
    const album = await getBuildingProgress({ complexCode, ...quarter })
    return {
      text: `${index + 1} квартал`,
      value: JSON.stringify(quarter),
      disabled: !album.length,
    }
  })
}

async function getQuarters(year: string, complexCode: string): Promise<TabButtonItem[]> {
  const quarters = [
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

  return await Promise.all(convertQuarters(quarters, complexCode))
}

export async function GET(request: NextRequest, props: ComplexPage) {
  const params = await props.params
  const year = request.nextUrl.searchParams.get('year')
  if (!year) return
  const data = await getQuarters(year, params.complex)
  return Response.json(data)
}
