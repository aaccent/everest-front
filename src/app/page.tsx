import ContactForm from '@/components/ContactForm/ContactForm'
import SliderSection from '@/components/Slider/SliderSection'
import UsefulLinks from '@/page-components/main/UsefulLinks/UsefulLinks'
import MainHero from '@/page-components/main/MainHero'
import { getNewBuildingsOnMain } from '@/globals/api'
import Services from '@/components/Services/Services'

export default async function Home() {
  const newBuildingsOnMain = await getNewBuildingsOnMain()

  return (
    <>
      <MainHero />
      <SliderSection data={newBuildingsOnMain} title='Новостройки' />
      <Services />
      <UsefulLinks />
      <ContactForm />
    </>
  )
}
