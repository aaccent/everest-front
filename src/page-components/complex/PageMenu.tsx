import React from 'react'

function PageMenu({ className }: { className?: string }) {
  return (
    <div className={className}>
      <nav className='border-b border-b-base-600/10 pb-[32px]'>
        <ul className='-mx-container px-container flex items-center gap-[24px] overflow-auto scrollbar-transparent'>
          <li className='whitespace-nowrap'>О проекте</li>
          <li className='whitespace-nowrap'>Инфраструктура</li>
          <li className='whitespace-nowrap'>Наши предложения</li>
          <li className='whitespace-nowrap'>Выбор квартиры</li>
          <li className='whitespace-nowrap'>Подбор ипотеки</li>
        </ul>
      </nav>
    </div>
  )
}

export default PageMenu
