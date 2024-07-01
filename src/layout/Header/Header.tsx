import React from 'react'
import HeaderColor from './HeaderColor'

function Header() {
  const whiteHeaderStyles = 'peer-[.is-white]/header-color:text-base-100'
  const blackHeaderStyles = 'peer-[.is-black]/header-color:text-base-600'

  return (
    <>
      <HeaderColor />
      <header className={`${whiteHeaderStyles} ${blackHeaderStyles}`}></header>
    </>
  )
}

export default Header
