export type Filters = {
  filters: FilterBlock[]
  sorts: Sort[]
}

export type QuickFilters = {
  filters: FilterType<Choice | Range | Toggle>[]
  sorts: Sort[]
}

export type Sort = {
  name: string
  value: string
}

export type FilterBlock = {
  name: string
  filters: FilterType<Choice | Range | Toggle>[]
}

export type FilterType<T extends FilterView> = {
  [key in keyof T]: T[key]
} & { id: number; name: string }

export type Choice = {
  fieldType: 'multilist' | 'inline-multilist'
  value: {
    value: string[]
  }
}
export type Range = {
  fieldType: 'range'
  value: { value: { min: number; max: number } }
}

export type Toggle = {
  fieldType: 'toggle'
  value: {
    value: boolean
  }
}

export type FilterView = Choice | Range | Toggle
