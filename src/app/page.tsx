import ContactForm from '@/components/ContactForm/ContactForm'
import SliderSection from '@/components/Slider/SliderSection'
import UsefulLinks from '@/page-components/main/UsefulLinks/UsefulLinks'
import MainHero from '@/page-components/main/MainHero'
import Services from '@/components/Services/Services'

export default function Home() {
  return (
    <>
      <MainHero />
      <Services />
      <SliderSection type={'newBuildings'} />
      <UsefulLinks />
      <ContactForm />
    </>
  )
}
