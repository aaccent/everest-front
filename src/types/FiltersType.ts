export type Filters = {
  filters: FilterBlock[]
  sorts: Sort[]
}

export type QuickFilters = {
  filters: FilterType<FilterView>[]
  sorts: Sort[]
}

export type Sort = {
  name: string
  value: string
}

export type FilterBlock = {
  name: string
  filters: FilterType<FilterView>[]
}

export type FilterType<T extends FilterView> = {
  [key in keyof T]: T[key]
} & {
  id: number
  name: string
  prefix: T extends Range ? T['prefix'] : never
}

export type Choice = {
  fieldType: 'multilist' | 'inline-multilist'
  value: string[]
}
export type Range = {
  fieldType: 'range'
  value: [number, number]
  prefix: string
}

export type Toggle = {
  fieldType: 'toggle'
  value: boolean
}

export type FilterView = Choice | Range | Toggle
