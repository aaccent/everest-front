import ContactForm from '@/components/ContactForm/ContactForm'
import SliderSection from '@/components/Slider/SliderSection'
import UsefulLinks from '@/page-components/main/UsefulLinks/UsefulLinks'
import MainHero from '@/page-components/main/MainHero'
import { getNewBuildingsOnMain } from '@/globals/api'

export default async function Home() {
  const newBuildingsOnMain = await getNewBuildingsOnMain()
  /*const newInCatalog = getNewInCatalog()*/
  return (
    <>
      <MainHero />
      <SliderSection data={newBuildingsOnMain} title='Новостройки' />
      <UsefulLinks />
      <ContactForm />
    </>
  )
}
