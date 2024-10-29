'use client'

import { useEffect } from 'react'
import Container from '@/layout/Container'

import TrianglesBg from '@/assets/static/decorative-bg/triangles-bg.svg'
import Img from '@/ui/Img'
import Button from '@/ui/buttons/Button'
import Breadcrumbs from '@/components/Breadcrumbs'
import { hideScroll } from '@/features/scroll'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error(error)
    hideScroll()
  }, [error])

  return (
    <>
      <Breadcrumbs className='mb-[135px] md:mb-[50px]' list={[{ name: 'Ошибка загрузки', seo: '' }]} />
      <Container className='error-section peer relative flex h-screen flex-col'>
        <h1 className='text-header-100 mx-auto mt-[100px] block text-center uppercase'>Ошибка загрузки</h1>
        <Button
          className='text-base-500-reg-100-upper mx-auto mt-[48px] h-[50px] w-full text-center md:h-[48px] md:w-fit'
          href='/'
        >
          Перейти на главную
        </Button>
        <Img
          className='absolute left-1/2 top-0 -z-10 h-[380px] max-w-[initial] -translate-x-1/2 md:h-[520px]'
          src={TrianglesBg}
        />
      </Container>
    </>
  )
}
