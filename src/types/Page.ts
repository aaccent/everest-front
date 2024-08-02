export type Page<TParams extends object> = {
  params: TParams
}

export type SubcategoryPage = Page<{
  subcategory: string
}>

export type ObjectPage = Page<{
  object: string
}>
