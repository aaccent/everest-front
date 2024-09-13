import React, { PropsWithChildren, useContext } from 'react'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import Button from '@/ui/buttons/Button'
import { PopupContext } from '@/components/Popup/Popup'

interface Props extends PropsWithChildren {
  className?: string
}

function CenteredPopup({ className, children }: Props) {
  return (
    <div className='flex h-full w-full'>
      <div
        className={`relative mt-auto h-fit w-full rounded-t-[24px] bg-base-100 p-[24px] pb-[32px] md:m-auto md:w-fit md:rounded-[24px] md:p-[40px] md:pt-[32px] ${className}`}
      >
        {children}
        <ClosePopupButton className='hidden md:absolute md:left-[calc(100%+16px)] md:top-0 md:flex md:bg-base-100/15 md:after:filter-base-100' />
      </div>
    </div>
  )
}

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
