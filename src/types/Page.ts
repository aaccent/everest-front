export type Page<TParams extends object> = {
  params: Promise<TParams>
}

export type CategoryPage = Page<{
  category: string
}>

export type SubcategoryPage = Page<{
  subcategory: string
}>

export type ObjectPage = Page<{
  object: string
}>

export type ComplexPage = Page<{
  complex: string
}>

export type LayoutPage = Page<{
  layoutId: string
}>
