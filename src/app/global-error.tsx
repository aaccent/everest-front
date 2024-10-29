'use client'

import { useEffect } from 'react'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <h1 className='mb-[15px] mt-[35px]'>Критическая ошибка загрузки</h1>
        <br />
        <a className='text-primary hover:text-primaryHover' href='/'>
          Перейти на главную
        </a>
      </body>
    </html>
  )
}