import realtors from '@/globals/mock-data/realtors-list.json'
import { RealtorCardType } from '@/app/realtors/_components/RealtorsList'

export async function getRealtorsList(subString: string | null = null): Promise<RealtorCardType[]> {
  return realtors
}
