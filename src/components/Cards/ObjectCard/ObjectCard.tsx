import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'
import ObjectListCard from '@/components/Cards/ObjectCard/ObjectListCard'
import { CategoryForGeneratingLink } from '@/features/link'
import ObjectTileCard from '@/components/Cards/ObjectCard/ObjectTileCard'

interface Props {
  item: ObjectCardType
  view?: 'tile' | 'list'
  category: CategoryForGeneratingLink
}

function ObjectCard({ item, category, view = 'tile' }: Props) {
  if (view === 'list') return <ObjectListCard item={item} category={category} />

  return <ObjectTileCard item={item} category={category} />
}

export default ObjectCard
