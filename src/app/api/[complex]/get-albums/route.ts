import { NextRequest } from 'next/server'
import { ComplexPage } from '@/types/Page'
import { BuildingProgressImage, getBuildingProgress, Period } from '@/globals/api'

const test = [
  {
    date: '2023-07-24T00:00:00.000000Z',
    image: 'https://s3.timeweb.cloud/fb44783f-c46d91fc-d1f3-4fbb-915e-3fea5507aa85/images/block-1.jpg',
  },
]

function convertToAlbums(rawData: BuildingProgressImage[]) {
  const data: AlbumData = {}
  rawData
    .concat(rawData)
    .concat(test)
    .forEach((a) => {
      if (data[a.date]) {
        data[a.date].push(a)
      } else {
        data[a.date] = []
        data[a.date].push(a)
      }
    })
  return data
}

export async function GET(request: NextRequest, { params }: ComplexPage) {
  const quarterStr = request.nextUrl.searchParams.get('quarter')
  if (!quarterStr) return
  const quarterObject: Period = JSON.parse(quarterStr)
  const rawData = await getBuildingProgress({ complexCode: params.complex, ...quarterObject })
  const data = convertToAlbums(rawData)
  return Response.json(data)
}

type AlbumData = {
  [index: string]: BuildingProgressImage[]
}
