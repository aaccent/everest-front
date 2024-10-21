import { Filter } from '@/features/catalog/useFilter'

export interface LayoutGroup {
  name: string
  typeOfLayoutId: number
  params: string[]
  count: number
  priceFrom: number
  filters: Filter[]
  address: string
  image: string
}
