import { NextRequest } from 'next/server'
import { ComplexPage } from '@/types/Page'
import { BuildingProgressImage, getBuildingProgress, Period } from '@/globals/api'

function convertToAlbums(rawData: BuildingProgressImage[]) {
  const data: AlbumData = {}
  rawData.forEach((photo) => {
    if (data[photo.date]) {
      data[photo.date].push(photo)
    } else {
      data[photo.date] = []
      data[photo.date].push(photo)
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
