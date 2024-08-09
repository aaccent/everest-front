import React from 'react'
import { AnyCategory } from '@/types/Category'

interface ViewComponentProps<TCategory extends AnyCategory> {
  category: TCategory
  item: TCategory['objects'][0]
}

type ViewComponent<TCategory extends AnyCategory> = (props: ViewComponentProps<TCategory>) => React.ReactNode

export function viewFunctions<TCategory extends AnyCategory>(
  category: TCategory,
  ListViewComponent: ViewComponent<TCategory>,
  TileViewComponent: ViewComponent<TCategory>,
) {
  function tileView() {
    return category.objects.map((item) => <TileViewComponent category={category} item={item} key={item.id} />)
  }

  function listView() {
    return category.objects.map((item) => <ListViewComponent category={category} item={item} key={item.id} />)
  }

  return { listView: listView(), tileView: tileView() }
}
