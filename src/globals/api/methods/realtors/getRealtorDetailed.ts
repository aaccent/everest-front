import realtorWithDateInExperience from '@/globals/mock-data/realtorDetailed_1.json'
import realtorWithStringInExperience from '@/globals/mock-data/realtorDetailed_2.json'
import { RealtorDetailed } from '@/types/Realtor'

export async function getRealtorDetailed(code: string): Promise<RealtorDetailed> {
  if (code === 'code2') return realtorWithStringInExperience
  return realtorWithDateInExperience
}
