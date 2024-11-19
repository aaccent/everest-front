import React, { useEffect, useState } from 'react'

const PAGE_MENU = [
  {
    title: 'О проекте',
    dataSet: 'about',
  },
  {
    title: 'Инфраструктура',
    dataSet: null,
  },
  {
    title: 'Наши предложения',
    dataSet: 'offers',
  },
  {
    title: 'Выбор квартиры',
    dataSet: 'complex-layout',
  },
  {
    title: 'Подбор ипотеки',
    dataSet: null,
  },
]

function PageMenu({ className }: { className?: string }) {
  const [activeMenuItem, setActiveMenuItem] = useState<string>(PAGE_MENU[0].dataSet || '')

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const targetId = e.currentTarget.dataset.id
    if (!targetId) return

    const target = document.getElementById(targetId)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function showMenu() {
    return PAGE_MENU.map((item) => {
      return (
        <li
          className={`cursor-pointer whitespace-nowrap ${activeMenuItem === item.dataSet ? 'text-base-600' : ''}`}
          data-id={item.dataSet}
          onClick={onClick}
          key={item.dataSet}
        >
          {item.title}
        </li>
      )
    })
  }

  useEffect(() => {
    if (className?.includes('static')) return

    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          setActiveMenuItem(entries.target.id)
        } else {
          setActiveMenuItem('')
        }
      },
      { threshold: 0.7 },
    )

    PAGE_MENU.forEach((item) => {
      if (!item.dataSet) return
      const targetElement = document.getElementById(item.dataSet)
      targetElement && observer.observe(targetElement)
    })
  }, [])

  return (
    <div className={className}>
      <nav className='border-b border-b-base-600/10 pb-[32px]'>
        <ul className='-mx-container px-container text-base-400-reg-100 flex items-center gap-[24px] overflow-auto uppercase scrollbar-transparent'>
          {showMenu()}
        </ul>
      </nav>
    </div>
  )
}

export default PageMenu
