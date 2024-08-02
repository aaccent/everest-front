import React from 'react'
import Link from 'next/link'
import { BreadcrumbItem } from '@/types/Breadcrumbs'
import { AnyCategory } from '@/types/Category'

interface BreadcrumbProps {
  title: string
  href: string
}

function Breadcrumb({ title, href }: BreadcrumbProps) {
  return (
    <li className='group/breadcrumb flex-shrink-0'>
      <Link
        className='text-base-500-reg-200 flex items-center gap-[6px] text-base-650 before:block before:h-[16px] before:w-[20px] before:bg-icon-long-arrow before:opacity-50 before:filter-base-600 before:bg-default-contain group-first/breadcrumb:before:hidden group-last/breadcrumb:pointer-events-none group-last/breadcrumb:text-primary group-last/breadcrumb:before:opacity-100 group-last/breadcrumb:before:filter-primary'
        href={href}
      >
        {title}
      </Link>
    </li>
  )
}

function generateLinkFromBreadcrumb(breadcrumbs: BreadcrumbItem[]) {
  let link = '/catalog'

  breadcrumbs.forEach((breadcrumb) => {
    link += `/${breadcrumb.seo}`
  })

  return link
}

type Props = {
  className: string
} & (
  | {
      list: BreadcrumbItem[]
      category?: never
    }
  | {
      list?: never
      category: AnyCategory
    }
)

function Breadcrumbs({ className, list, category }: Props) {
  function showItems() {
    const _list = list ? list : category.breadcrumbs

    return _list.map((item, i) => (
      <Breadcrumb key={item.seo} href={generateLinkFromBreadcrumb(_list.toSpliced(i + 1))} title={item.name} />
    ))
  }

  return (
    <nav className={`px-container mb-[30px] mt-[16px] md:mb-[40px] md:mt-[27px] ${className}`}>
      <ul className='-mx-container px-container flex items-center gap-[6px] overflow-x-auto scrollbar-transparent'>
        <Breadcrumb href='/' title='Главная' />
        {showItems()}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
