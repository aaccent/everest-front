import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Input from '@/ui/inputs/Input'
import CallForm from '@/ui/forms/CallForm'
import SubmitButton from '@/ui/buttons/SubmitButton'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import { PopupTemplate } from '@/layout/popups/PopupTemplate'

import { getSocials } from '@/globals/api'
import { socialItem } from '@/layout/Footer/Footer'

import bgLogo from '@/assets/static/call-popup-bg.svg'
import { INPUT_NAMES } from '@/globals/inputs/call-form'
import NameInput from '@/ui/inputs/NameInput'
import PhoneInput from '@/ui/inputs/PhoneInput'

function CallPopup() {
  const [socials, setSocials] = useState<socialItem[]>()

  useEffect(() => {
    getSocials().then((result) => setSocials(result))
  }, [])

  function showSocials() {
    return socials?.map((social, index) => {
      return (
        <Link
          className='flex size-[55px] items-center justify-center rounded-full bg-base-300'
          href={social.url}
          key={index}
        >
          <Image src={social.icon} width={33} height={33} alt='' className='filter-base-600' />
        </Link>
      )
    })
  }

  return (
    <PopupTemplate>
      <div className='absolute inset-x-0 bottom-0 rounded-t-[24px] bg-base-100 p-[24px] md:top-[10%] md:flex md:h-full md:justify-center md:bg-base-200 md:py-[56px]'>
        <Image src={bgLogo} alt='' className='absolute bottom-0 right-0 hidden md:block' />
        <div className='md:z-50 md:h-fit md:w-[642px] md:rounded-[32px] md:bg-base-100 md:p-[40px]'>
          <div className='text-header-300 mb-[16px] w-[280px] md:w-full md:max-w-[472px]'>
            Оставьте заявку на бесплатную консультацию
          </div>
          <div className='text-base-200-lg-100 mb-[40px] text-base-650 md:w-full md:max-w-[472px]'>
            Мандрикова Наталья Вячеславовна свяжется вами в течение 15 минут или выберите удобное время
          </div>
          <CallForm className='mb-[40px] flex flex-col gap-[8px] md:block'>
            <div className='flex flex-col gap-[8px] md:flex-row md:gap-[12px]'>
              <NameInput className='w-full' name={INPUT_NAMES.NAME.name} required />
              <PhoneInput className='w-full' name={INPUT_NAMES.PHONE.name} required />
            </div>
            <Input
              className='w-full md:mt-[16px]'
              type={INPUT_NAMES.CALL_TIME.type}
              name={INPUT_NAMES.CALL_TIME.name}
              placeholder='время звонка'
              required
            />
            <div className='text-base-400-lg-100 mt-[20px] text-base-650'>
              Нажимая кнопку «Отправить» вы даете свое согласие на <Link href='#'>обработку данных</Link>
            </div>
            <SubmitButton className='mt-[32px] w-full' variation='primary' size='medium'>
              Отправить
            </SubmitButton>
          </CallForm>
          <div className='text-base-200-lg-100 mb-[20px] hidden text-base-650 md:block'>Связаться c помощью:</div>
          <div className='hidden items-center gap-[61px] md:flex'>
            <div className='relative flex w-fit items-center gap-[10px] after:absolute after:right-[-30px] after:top-1/2 after:block after:h-[31px] after:w-[1px] after:-translate-y-1/2 after:bg-base-500'>
              {showSocials()}
            </div>
            <div>
              <div className='text-base-100-reg-100 mb-[2px]'>8 (843) 207-39-50</div>
              <div className='text-base-400-lg-100 text-base-650'>Ежедневно с 09:00 до 19:00</div>
            </div>
          </div>
        </div>
        <ClosePopupButton className='absolute right-[24px] top-[24px]' />
      </div>
    </PopupTemplate>
  )
}

export default CallPopup
