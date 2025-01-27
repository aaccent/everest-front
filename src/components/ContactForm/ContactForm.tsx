import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Section from '@/layout/Section'
import CallForm from '@/ui/forms/CallForm'
import NameInput from '@/ui/inputs/NameInput'
import PhoneInput from '@/ui/inputs/PhoneInput'
import Input from '@/ui/inputs/Input'
import SubmitButton from '@/ui/buttons/SubmitButton'
import FormMap from '@/components/ContactForm/FormMap'
import { getSocials } from '@/globals/api'
import Img from '@/ui/Img'

import { INPUT_NAMES } from '@/globals/inputs/call-form'
import { getPathname } from '@/features/pathname'
import { ROUTES } from '@/globals/paths'

import mobileBavel from '@/assets/static/decorative-bg/decorative-bavel-mobile.svg'
import bavel from '@/assets/static/decorative-bg/decorative-bavel.svg'

function ContactFormImage() {
  return (
    <div className='relative hidden w-full max-w-[649px] overflow-hidden rounded-[32px] md:block'>
      <Img src='/contact-form-image.png' width={649} height={618} className='size-full object-cover object-center' />
      <Img src={bavel} className='absolute right-0 top-0 filter-primary' />
    </div>
  )
}

interface socialItem {
  name: string
  icon: string
  url: string
}

async function ContactForm() {
  const socials: socialItem[] = await getSocials()

  const pathname = await getPathname()
  if (pathname === ROUTES.MAP) return null
  const isContactsPage = pathname === ROUTES.CONTACTS

  function showSocials() {
    return socials.map((social, index) => (
      <Link className='flex items-center gap-[10px]' href={social.url} key={index}>
        <div className='flex size-[48px] items-center justify-center rounded-full bg-base-115 md:size-[55px]'>
          <Image src={social.icon} alt='' width={24} height={24} />
        </div>
      </Link>
    ))
  }

  return (
    <Section
      containerClassName='relative w-full rounded-tl-[20px] rounded-b-[20px] md:flex justify-between md:px-[56px] md:py-[56px] md:bg-primary'
      className='peer-[.error-section]:hidden'
    >
      <Image src={bavel} alt='' className='absolute right-0 top-0 hidden md:block' />
      <Image src={mobileBavel} alt='' className='absolute right-0 top-0 md:hidden' />
      <div className='mb-[24px] rounded-[20px] bg-primary p-[20px] text-base-100 md:m-0 md:w-[676px] md:bg-none md:p-0'>
        <h2 className='text-header-200 mb-[16px] font-coolvetica uppercase'>
          Оставьте заявку на бесплатную консультацию
        </h2>
        <div className='text-base-200-lg-100 mb-[26px] text-base-150 md:mb-[56px] md:max-w-[576px]'>
          Наш менеджер свяжется с вами в течение 15 минут или закажите звонок, перезвоним в удобное время
        </div>
        <CallForm className='flex flex-col gap-[8px] md:block'>
          <NameInput
            className='w-full md:mr-[16px] md:inline-flex md:w-[330px]'
            name={INPUT_NAMES.NAME.name}
            required
            onDark
          />
          <PhoneInput
            className='w-full md:mb-[16px] md:inline-flex md:w-[330px]'
            name={INPUT_NAMES.PHONE.name}
            required
            onDark
          />
          <Input
            className='w-full'
            type={INPUT_NAMES.CALL_TIME.type}
            name={INPUT_NAMES.CALL_TIME.name}
            placeholder='время звонка'
            required
            onDark
          />
          <div className='md:mb-[67px] md:mt-[32px] md:flex md:items-center md:gap-[24px]'>
            <SubmitButton className='mb-[16px] w-full md:m-0 md:w-[180px]' variation='third' size='medium'>
              Отправить
            </SubmitButton>
            <div className='text-base-400-lg-100 mb-[48px] text-center text-base-150 md:m-0 md:w-[332px] md:text-left'>
              Нажимая кнопку «Отправить» вы даете свое согласие на{' '}
              <Link href='#' className='text-base-100'>
                обработку данных
              </Link>
            </div>
          </div>
        </CallForm>
        <div className='text-base-200-lg-100 mb-[20px] text-center text-base-150 md:text-left'>
          Связаться c помощью:
        </div>
        <div className='md:flex md:items-center md:gap-[60px]'>
          <div className='mb-[18px] flex justify-center gap-[10px] md:relative md:m-0 md:after:absolute md:after:right-[-30px] md:after:top-1/2 md:after:block md:after:h-[31px] md:after:w-[1px] md:after:-translate-y-1/2 md:after:bg-base-400'>
            {showSocials()}
          </div>
          <div className='mb-[11px] text-center md:text-left'>
            <Link href='tel:8 (843) 207-39-50' className='text-base-100-reg-100'>
              8 (843) 207-39-50
            </Link>
            <div className='text-base-400-lg-100 text-base-150'>Ежедневно с 09:00 до 19:00</div>
          </div>
        </div>
      </div>
      {isContactsPage ? <ContactFormImage /> : <FormMap />}
    </Section>
  )
}

export default ContactForm
