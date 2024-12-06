import { Filter } from '@/features/useFilter'

export interface LayoutGroup {
  name: string
  id: number
  params: string[]
  count: number
  priceFrom: number
  filters: Filter[]
  address: string
  image: string
}
