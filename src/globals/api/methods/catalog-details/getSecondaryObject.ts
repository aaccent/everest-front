import secondaryObject from '@/globals/mock-data/secondary-object.json'
import { SecondaryDetailObject } from '@/types/SecondaryDetailObject'

export async function getSecondaryObject(code: string): Promise<SecondaryDetailObject> {
  return secondaryObject.data
}
