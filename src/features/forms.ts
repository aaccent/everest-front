'use server'

import { sendCallRequest } from '@/globals/api/methods/sendCallRequest'

export async function callFormHandler(formData: FormData) {
  return sendCallRequest({
    phone: formData.get('tel') as string,
    name: formData.get('name') as string,
    text: formData.get('time') as string,
  })
}
