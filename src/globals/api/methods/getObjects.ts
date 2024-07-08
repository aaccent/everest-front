import objects from '@/globals/mock-data/objects.json'

export async function getObjects(type: string) {
  return objects.find((obj) => obj.type === type)
}
