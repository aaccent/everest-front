import React from 'react'

function PageMenu({ className }: { className?: string }) {
  return (
    <div className={className}>
      <nav className='overflow-auto border-b border-b-base-600/10 pb-[32px] scrollbar-transparent'>
        <ul className='flex items-center gap-[24px]'>
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
