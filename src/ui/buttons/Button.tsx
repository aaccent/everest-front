import React, { PropsWithChildren } from 'react'
import { IconName, ICONS_NAME } from '@/globals/icons/icons'

interface Props extends PropsWithChildren {
  text?: string
  type?: 'primary' | 'second' | 'third' | 'transparent' | 'outline'
  size?: 'small' | 'medium' | 'large'
  icon?: {
    img: IconName
    position?: 'left' | 'right'
  }
  className?: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

function Button(props: Props) {
  function typeClassName() {
    switch (props.type) {
      case 'primary':
      default:
        return 'bg-primary text-base-100 hover:bg-primaryHover disabled:bg-system-disabled disabled:after:filter-base-100'
      case 'second':
        return 'bg-base-300 text-base-600 hover:bg-primary hover:text-base-100 disabled:text-base-500 disabled:after:filter-base-500'
      case 'third':
        return 'bg-base-100 text-base-600 hover:bg-primaryHover hover:text-base-100 disabled:text-base-500 disabled:after:filter-base-500'
      case 'transparent':
        return 'bg-base-115 text-base-100 hover:bg-base-100 hover:text-base-600 disabled:text-base-500 disabled:after:filter-base-500'
      case 'outline':
        return 'border border-primary text-primary after:filter-primary hover:bg-primary hover:text-base-100 disabled:text-system-disabled disabled:border-system-disabled disabled:after:filter-system-disabled'
    }
  }

  function sizeClassName() {
    switch (props.size) {
      case 'small':
        let width = props.loading ? 'w-[105px]' : 'w-fit'
        return `${width} flex justify-center items-center gap-[6px] px-[16px] py-[12px] text-base-500-reg-100-upper`
      case 'medium':
      default:
        return 'w-[180px] py-[18px]'
      case 'large':
        return 'w-[200px] py-[31px]'
    }
  }

  function iconClassName() {
    if (!props.icon) return
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
      ['third', 'outline'].includes(props.type || '') ? 'hover:after:filter-base-100' : '',
    ].join(' ')
  }

  function loading() {
    if (!props.loading) return props.text || props.children

    let spinColor
    switch (props.type) {
      case 'primary' || 'transparent':
      default:
        spinColor = 'filter-base-100'
        break
      case 'second' || 'third':
        spinColor = 'filter-base-600'
        break
      case 'outline':
        spinColor = 'filter-primary'
    }
    return (
      <svg
        className={`${spinColor} animate-spin size-[20px] m-auto bg-icon-loading bg-no-repeat bg-center`}
        viewBox='0 0 24 24'
      ></svg>
    )
  }

  return (
    <button
      className={`rounded-[16px] uppercase ${iconClassName()} ${sizeClassName()} ${typeClassName()} ${props.className} disabled:pointer-events-none`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {loading()}
    </button>
  )
}

export default Button
