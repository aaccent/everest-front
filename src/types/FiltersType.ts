export type FiltersType<Type extends Choice | MinMax | Toggle> = {
  name: string
  filters: FilterInput<Type>[]
  sorts: Sort[]
}

type Sort = {
  name: string
  value: string
}

type FilterInput<View> = {
  [key in keyof View]: View[key]
} & { title: string }

export type Choice = {
  type: 'radio' | 'multilist' | 'multilist-inline' | 'tabs'
  value: string[]
  defaultValue?: string
}

export type MinMax = {
  type: 'range' | 'range-price'
  value: {
    min: number
    max: number
  }
  defaultValue?: [number, number]
}

export type Toggle = {
  type: 'toggle'
  value: boolean
  defaultValue?: boolean
}
