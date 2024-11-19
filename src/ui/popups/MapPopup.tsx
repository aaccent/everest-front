import React from 'react'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import { PopupTemplate } from '@/layout/popups/PopupTemplate'

function MapPopup() {
  return (
    <PopupTemplate>
      <div>map</div>
      <ClosePopupButton />
    </PopupTemplate>
  )
}

export default MapPopup
