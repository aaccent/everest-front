import React, { PropsWithChildren } from 'react'
import { Characteristic, ObjectCardCharacteristic } from '@/types/Characteristic'

function InfoItem({ children }: PropsWithChildren) {
  return <li className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[8px]'>{children}</li>
}

export function showParams(params: string[] | Characteristic[] | ObjectCardCharacteristic[]) {
  return params.map((param, i) => <InfoItem key={i}>{typeof param === 'object' ? param.value : param}</InfoItem>)
}
