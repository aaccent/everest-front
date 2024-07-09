import ContactForm from '@/components/ContactForm/ContactForm'
import SliderSection from '@/components/Slider/SliderSection'
import UsefulLinks from '@/components/UsefulLinks/UsefulLinks'

export default function Home() {
  return (
    <>
      <UsefulLinks />
      <SliderSection type={'newBuildings'} />
      <ContactForm />
    </>
  )
}
