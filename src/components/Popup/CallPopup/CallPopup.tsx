import React from 'react'
import Input from '@/ui/Input'
import SubmitButton from '@/ui/buttons/SubmitButton'
import Image from 'next/image'
import bgLogo from '@/assets/static/call-popup-bg.svg'
import Link from 'next/link'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import { callFormHandler } from '@/features/forms'
import Form from '@/ui/Form'
import { getSocials } from '@/globals/api/methods/getSocials'
import { socialItem } from '@/layout/Footer/Footer'

async function CallPopup() {
  const socials: socialItem[] = await getSocials()

  function showSocials() {
    return socials.map((social, index) => {
      return (
        <Link
          className='flex size-[55px] items-center justify-center rounded-full bg-base-300'
          href={social.url}
          key={index}
        >
          <Image src={social.icon} width={33} height={33} alt={''} className='filter-base-600' />
        </Link>
      )
    })
  }

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-auto h-fit rounded-t-[24px] bg-base-100 p-[24px] md:flex md:justify-center md:bg-base-200 md:py-[56px]`}
    >
      <Image src={bgLogo} alt={''} className={`absolute bottom-0 right-0 hidden md:block`} />
      <div className={`md:z-50 md:w-[642px] md:rounded-[32px] md:bg-base-100 md:p-[40px]`}>
        <div className={`text-header-300 mb-[16px] w-[280px] md:w-full md:max-w-[472px]`}>
          Оставьте заявку на бесплатную консультацию
        </div>
        <div className={`text-base-200-lg-100 mb-[40px] text-base-650 md:w-full md:max-w-[472px]`}>
          Мандрикова Наталья Вячеславовна свяжется вами в течение 15 минут или выберите удобное время
        </div>
        <Form className='mb-[40px] flex flex-col gap-[8px] md:block' action={callFormHandler}>
          <Input
            className='w-full md:mr-[12px] md:inline-flex md:w-[275px]'
            type='text'
            name='name'
            placeholder='имя*'
          />
          <Input className='w-full md:inline-flex md:w-[275px]' type='tel' placeholder='Телефон*' name='tel' />
          <Input className='w-full md:mt-[16px]' type='tel' placeholder='время звонка*' name='time' />
          <div className='text-base-400-lg-100 mt-[20px] text-base-650'>
            Нажимая кнопку «Отправить» вы даете свое согласие на{' '}
            <Link href={'#'} className='text-base-100'>
              обработку данных
            </Link>
          </div>
          <SubmitButton className='mt-[32px] w-full' variation='primary' size='medium'>
            Отправить
          </SubmitButton>
        </Form>
        <div className={`text-base-200-lg-100 mb-[20px] text-base-650`}>Связаться c помощью:</div>
        <div className={`flex items-center gap-[61px]`}>
          <div
            className={`relative flex w-fit items-center gap-[10px] after:absolute after:right-[-30px] after:top-1/2 after:block after:h-[31px] after:w-[1px] after:-translate-y-1/2 after:bg-base-500`}
          >
            {showSocials()}
          </div>
          <div>
            <div className={`text-base-100-reg-100 mb-[2px]`}>8 (843) 207-39-50</div>
            <div className={`text-base-400-lg-100 text-base-650`}>Ежедневно с 09:00 до 19:00</div>
          </div>
        </div>
      </div>
      <ClosePopupButton />
    </div>
  )
}

export default CallPopup
