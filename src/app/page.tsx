import ContactForm from '@/components/ContactForm/ContactForm'
import SliderSection from '@/components/Slider/SliderSection'
import UsefulLinks from '@/page-components/main/UsefulLinks/UsefulLinks'
import MainHero from '@/page-components/main/MainHero'
import { getNewObjects } from '@/globals/api/methods/main-page'
import { getNewBuildingsOnMain } from '@/globals/api'
import Services from '@/components/Services/Services'

export default async function Home() {
  const newBuildingsOnMain = await getNewBuildingsOnMain()
  const newObjects = await getNewObjects()

  return (
    <>
      <MainHero />
      <SliderSection type='complex' list={newBuildingsOnMain} title='Новостройки' />
      <Services />
      <SliderSection type='objects' list={newObjects} title='Новинки в каталоге' />
      <UsefulLinks />
      <ContactForm />
    </>
  )
}
