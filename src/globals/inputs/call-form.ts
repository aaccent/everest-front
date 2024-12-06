import { CustomInputJSXMap } from '@/features/form/form.types'

export const INPUT_NAMES = {
  NAME: {
    name: 'name',
    type: 'text',
  },
  PHONE: {
    name: 'tel',
    type: 'tel',
  },
  CALL_TIME: {
    name: 'time',
    type: 'text',
  },
  URL: {
    name: 'url',
    type: 'text',
  },
} as const satisfies CustomInputJSXMap
