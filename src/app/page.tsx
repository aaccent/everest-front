import ContactForm from '@/components/ContactForm/ContactForm'
import SliderSection from '@/components/Slider/SliderSection'
import UsefulLinks from '@/page-components/main/UsefulLinks/UsefulLinks'
import MainHero from '@/page-components/main/MainHero'

export default function Home() {
  return (
    <>
      <MainHero />
      <SliderSection type={'newBuildings'} />
      <UsefulLinks />
      <ContactForm />
    </>
  )
}
