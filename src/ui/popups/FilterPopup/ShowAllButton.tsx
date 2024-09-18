'use client'

import React from 'react'
import Button from '@/ui/buttons/Button'

function ShowAllButton({ amount }: { amount: number }) {
  return <Button variation='primary' size='small' text={`Показать ${amount} объектов`} className='md:mr-[12px]' />
}

export default ShowAllButton
