import ContactForm from '@/components/ContactForm/ContactForm'
import SliderSection from '@/components/Slider/SliderSection'

export default function Home() {
  return (
    <>
      <SliderSection type={'newBuildings'} />
      <ContactForm />
    </>
  )
}
