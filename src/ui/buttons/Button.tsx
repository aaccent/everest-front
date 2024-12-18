import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { IconName, ICONS_NAME } from '@/globals/icons/icons'
import Link from 'next/link'

export type ButtonVariation = 'primary' | 'second' | 'third' | 'transparent' | 'outline'
type HTMLButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

export type Props = PropsWithChildren &
  HTMLButtonProps & {
    href?: string
    text?: string
    variation?: ButtonVariation
    size?: 'small' | 'medium' | 'large'
    icon?: {
      img: IconName
      position?: 'left' | 'right'
    }
    className?: string
    loading?: boolean
    disabled?: boolean
    onClick?: () => void
    onMouseEnter?: () => void
  }

function Button(props: Props) {
  function typeClassName() {
    switch (props.variation) {
      case 'primary':
      default:
        return `bg-primary text-base-100 ${!props.loading && 'hover:bg-primaryHover'} after:filter-base-100 disabled:bg-system-disabled disabled:after:filter-base-100`
      case 'second':
        return `bg-base-300 text-base-600 ${!props.loading && 'hover:bg-primary hover:after:filter-base-100 hover:text-base-100'} disabled:text-base-500 disabled:after:filter-base-500`
      case 'third':
        return `bg-base-100 text-base-600 ${!props.loading && 'hover:bg-primaryHover hover:text-base-100'}  disabled:text-base-500 disabled:after:filter-base-500`
      case 'transparent':
        return `bg-base-115 text-base-100 ${!props.loading && 'hover:bg-base-100 hover:text-base-600'} disabled:text-base-500 disabled:after:filter-base-500`
      case 'outline':
        return `border border-primary text-primary after:filter-primary ${!props.loading && 'hover:bg-primary hover:text-base-100'} disabled:text-system-disabled disabled:border-system-disabled disabled:after:filter-system-disabled`
    }
  }

  function sizeClassName() {
    switch (props.size) {
      case 'small':
        let width = props.loading ? 'w-[105px]' : 'w-fit'
        return `${width} flex justify-center items-center gap-[6px] px-[16px] py-[12px] text-base-500-reg-100-upper`
      case 'medium':
      default:
        return 'w-[180px] py-[17px]'
      case 'large':
        return 'w-[200px] py-[31px]'
    }
  }

  function iconClassName() {
    if (!props.icon) return 'after:hidden'
    if (props.loading) return

    return [
      props.icon.position === 'left' ? 'pr-[10px]' : 'pl-[10px]',
      'flex',
      props.icon.position === 'left' ? 'flex-row' : 'flex-row-reverse',
      'items-center',
      'gap-[4px]',
      'after:size-[20px]',
      `after:bg-${ICONS_NAME[props.icon.img]}`,
      'after:bg-default-auto',
      ['third', 'outline'].includes(props.variation || '') ? 'hover:after:filter-base-100' : '',
    ].join(' ')
  }

  function inner() {
    if (!props.loading) return props.text || props.children

    let spinColor
    switch (props.variation) {
      case 'third':
      case 'second':
        spinColor = 'filter-base-600'
        break
      case 'outline':
        spinColor = 'filter-primary'
        break
      case 'transparent':
      case 'primary':
      default:
        spinColor = 'filter-base-100'
        break
    }

    return (
      <svg
        className={`${spinColor} m-auto size-[20px] animate-spin bg-icon-loading bg-center bg-no-repeat`}
        viewBox='0 0 24 24'
      ></svg>
    )
  }

  const className = `rounded-[16px] uppercase transition-colors after:transition-[filter] ${iconClassName()} ${sizeClassName()} ${typeClassName()} text-base-500-reg-100-upper disabled:pointer-events-none ${props.className}`

  if (props.href) {
    return (
      <Link href={props.href} className={className} onClick={props.onClick} onMouseEnter={props.onMouseEnter}>
        {inner()}
      </Link>
    )
  }

  return (
    <button className={className} disabled={props.disabled} onClick={props.onClick} onMouseEnter={props.onMouseEnter}>
      {inner()}
    </button>
  )
}

export default Button
