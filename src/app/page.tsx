import SliderSection from '@/components/Slider/SliderSection'
import UsefulLinks from '@/page-components/main/UsefulLinks/UsefulLinks'
import MainHero from '@/page-components/main/MainHero'
import { getNewObjects } from '@/globals/api/methods/main-page'
import { getNewBuildingsOnMain } from '@/globals/api'
import Services from '@/components/Services/Services'
import { ROUTES } from '@/globals/paths'

export default async function Home() {
  const newBuildingsOnMain = await getNewBuildingsOnMain()
  const newObjects = await getNewObjects()

  return (
    <>
      <MainHero />
      <SliderSection type='complex' link={ROUTES.COMPLEXES} list={newBuildingsOnMain} title='Новостройки' />
      <Services />
      <SliderSection type='objects' link='#' list={newObjects} title='Новинки в каталоге' />
      <UsefulLinks />
    </>
  )
}
