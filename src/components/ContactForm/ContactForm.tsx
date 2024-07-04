import React from 'react'
import Image from 'next/image'
import bavel from '@/assets/static/decorative-bavel.svg'
import mobileBavel from '@/assets/static/decorative-bavel-mobile.svg'
import Section from '@/layout/Section'
import FormMap from '@/components/ContactForm/FormMap'
import { getAddresses } from '@/globals/api/methods/getAddresses'
import Input from '@/ui/Input'
import Button from '@/ui/Button'
import Link from 'next/link'
import { getSocials } from '@/globals/api/methods/getSocials'

interface socialItem {
  name: string
  icon: string
  url: string
}

async function ContactForm() {
  const city = 'Абакан'
  const addresses = await getAddresses()
  const currentCityAddresses = addresses.find((el) => el.city === city)
  console.log(currentCityAddresses)
  if (!currentCityAddresses) return

  const socials: socialItem[] = await getSocials()

  function showSocials() {
    return socials.map((social, index) => (
      <Link className='flex gap-[10px] items-center' href={social.url} key={index}>
        <div className='flex justify-center items-center size-[48px] rounded-full bg-base-115 md:size-[55px]'>
          <Image src={social.icon} alt={''} width={24} height={24} />
        </div>
      </Link>
    ))
  }

  return (
    <Section containerClassName='relative w-full rounded-tl-[20px] rounded-b-[20px] md:flex justify-between md:p-[56px] md:bg-primary'>
      <Image src={bavel} alt={''} className='hidden md:block absolute top-0 right-0' />
      <Image src={mobileBavel} alt={''} className='md:hidden absolute top-0 right-0' />
      <div className='mb-[24px] p-[20px] bg-primary rounded-[20px] text-base-100 md:w-[676px] md:bg-none md:p-0 md:m-0'>
        <h2 className='mb-[16px] text-header-200 font-coolvetica uppercase'>
          Оставьте заявку на бесплатную консультацию
        </h2>
        <div className='mb-[26px] text-base-200-lg-100 text-base-150 md:max-w-[576px] md:mb-[56px]'>
          Наш менеджер свяжется с вами в течение 15 минут или закажите звонок, перезвоним в удобное время
        </div>
        <form className='flex flex-col gap-[8px] md:block'>
          <Input
            className='w-full md:inline-flex md:mr-[16px] md:w-[330px]'
            type={'text'}
            placeholder={'имя*'}
            onDark
          />
          <Input className='w-full md:inline-flex md:w-[330px]' type={'tel'} placeholder={'Телефон*'} onDark />
          <Input className='w-full md:mt-[16px] md:mb-[32px]' type={'tel'} placeholder={'время звонка*'} onDark />
          <div className='md:flex md:gap-[24px] md:items-center md:mb-[67px]'>
            <Button
              text={'Отправить'}
              type={'third'}
              size={'medium'}
              className='w-full mb-[16px] md:w-[180px] md:m-0'
            />
            <div className='mb-[48px] text-center text-base-400-lg-100 text-base-150 md:text-left md:m-0 md:w-[332px]'>
              Нажимая кнопку «Отправить» вы даете свое согласие на{' '}
              <Link href={'#'} className='text-base-100'>
                обработку данных
              </Link>
            </div>
          </div>
        </form>
        <div className='mb-[20px] text-base-200-lg-100 text-base-150 text-center md:text-left'>
          Связаться c помощью:
        </div>
        <div className='md:flex md:items-center md:gap-[60px]'>
          <div className='flex justify-center gap-[10px] mb-[18px] md:relative md:m-0 md:after:absolute md:after:right-[-30px] md:after:top-1/2 md:after:-translate-y-1/2 md:after:block md:after:w-[1px] md:after:h-[31px] md:after:bg-base-400'>
            {showSocials()}
          </div>
          <div className='mb-[11px] text-center md:text-left'>
            <Link href={'tel:8 (843) 207-39-50'} className='text-base-100-reg-100'>
              8 (843) 207-39-50
            </Link>
            <div className='text-base-400-lg-100 text-base-150'>Ежедневно с 09:00 до 19:00</div>
          </div>
        </div>
      </div>
      <FormMap list={currentCityAddresses.offices} city={city} isOnForm />
    </Section>
  )
}

export default ContactForm
