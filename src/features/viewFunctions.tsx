import React from 'react'

interface ViewComponentProps<TItem extends { id: number }> {
  item: TItem
}

type ViewComponent<TItem extends { id: number }> = (props: ViewComponentProps<TItem>) => React.ReactNode

export function viewFunctions<
  TItem extends {
    id: number
  },
>(list: TItem[], ListViewComponent: ViewComponent<TItem>, TileViewComponent: ViewComponent<TItem>) {
  function tileView() {
    return list.map((item) => <TileViewComponent item={item} key={item.id} />)
  }

  function listView() {
    return list.map((item) => <ListViewComponent item={item} key={item.id} />)
  }

  return { listView: listView(), tileView: tileView() }
}
