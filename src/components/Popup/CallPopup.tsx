import React from 'react'
import Input from '@/ui/Input'
import SubmitButton from '@/ui/buttons/SubmitButton'
import Image from 'next/image'
import bgLogo from '@/assets/static/call-popup-bg.svg'
import Link from 'next/link'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'

function CallPopup() {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-[64px] rounded-t-[24px] bg-base-100 p-[24px] md:top-[48px] md:flex md:justify-center md:bg-base-200 md:py-[56px]`}
    >
      <Image src={bgLogo} alt={''} className={`absolute bottom-0 right-0 hidden md:block`} />
      <div className={`md:z-50 md:w-[642px] md:rounded-[32px] md:bg-base-100 md:p-[40px]`}>
        <div className={`text-header-300 mb-[16px]`}>Оставьте заявку на бесплатную консультацию</div>
        <div className={`text-base-200-lg-100 mb-[40px]`}>
          Мандрикова Наталья Вячеславовна свяжется вами в течение 15 минут или выберите удобное время
        </div>
        <form className={`mb-[40px]`}>
          <Input className={`mb-[12px]`} placeholder={'Имя'} />
          <Input className={`mb-[12px]`} placeholder={'телефон'} />
          <Input placeholder={'время звонка'} className={`mb-[20px]`} />
          <div className={`text-base-400-lg-100 mb-[32px] text-base-650`}>
            Нажимая кнопку «Отправить» вы даете свое согласие на{' '}
            <Link href={''} className={`text-primary`}>
              обработку данных
            </Link>
          </div>
          <SubmitButton className={`w-full`}>Отправить</SubmitButton>
        </form>
      </div>
      <ClosePopupButton />
    </div>
  )
}

export default CallPopup
