import React, { useContext } from 'react'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Button from '@/ui/buttons/Button'
import { PopupContext } from '@/features/Popup'
import { CenteredPopup } from '@/layout/popups/CenteredPopup'

function ThxPopup() {
  const { closePopup } = useContext(PopupContext)

  return (
    <CenteredPopup className='md:w-[512px]'>
      <div className='mb-[16px] flex w-full justify-between md:mb-[24px]'>
        <div className='text-header-300'>
          Спасибо, ваша заявка
          <br />
          успешно отправлена!
        </div>
        <ClosePopupButton className='md:hidden' />
      </div>
      <div className='text-base-200-lg-100 mb-[24px] text-base-600/50 md:mb-[40px]'>
        Наш&nbsp;менеджер свяжется с&nbsp;вами
      </div>
      <Button className='w-full md:h-[54px]' onClick={closePopup}>
        отлично
      </Button>
    </CenteredPopup>
  )
}

export default ThxPopup
