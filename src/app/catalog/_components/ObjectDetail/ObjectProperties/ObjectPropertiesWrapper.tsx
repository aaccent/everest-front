'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '@/ui/buttons/Button'
import { Tab, TAB_TYPE, TabButton } from '@/app/catalog/_components/ObjectDetail/ObjectProperties/TabButton'
import { AdaptiveContext } from '@/features/utility/adaptive'

interface Props {
  propsTabContent: React.ReactNode
  descTabContent: React.ReactNode
}

/**
 * Добавляет функционал переключения между вкладками.
 * Создаёт состояние и кнопки, которые меняют состояния на значения {@link TAB_TYPE}.
 *
 * В зависимости от значения состояния:
 * * [`TAB_TYPE.DESCRIPTION`]{@link TAB_TYPE.DESCRIPTION} - выводит `descTabContent`.
 * * [`TAB_TYPE.PROPERTIES`]{@link TAB_TYPE.PROPERTIES} - выводит `propsTabContent`.
 *
 * На мобильных устройствах скрывает под градиентом контент и добавляет кнопку "показать ещё".
 * При нажатии градиент убирается, а кнопка пропадает
 * */
function ObjectPropertiesWrapper({ propsTabContent, descTabContent }: Props) {
  const blockRef = useRef<HTMLDivElement | null>(null)
  const [tab, setTab] = useState<Tab>(TAB_TYPE.PROPERTIES)
  const [showMore, setShowMore] = useState(false)
  const { isDesktop } = useContext(AdaptiveContext)

  function changeTab(tab: Tab) {
    setTab(tab)
    setShowMore(false)
  }

  function resetShowMore() {
    if (typeof window === 'undefined' || !blockRef.current) return
    if (isDesktop) return

    if (showMore) return
    if (blockRef.current.offsetHeight < 320) return setShowMore(true)

    blockRef.current.style.maxHeight = '320px'
  }

  useEffect(resetShowMore, [tab, showMore])

  return (
    <>
      <div className='w-fit rounded-t-[20px] bg-[#eee]'>
        <h2 className='inline-block'>
          <TabButton
            className={tab === TAB_TYPE.PROPERTIES ? 'active' : ''}
            onClick={() => changeTab(TAB_TYPE.PROPERTIES)}
          >
            Характеристики
          </TabButton>
        </h2>
        <TabButton
          className={tab === TAB_TYPE.DESCRIPTION ? 'active' : ''}
          onClick={() => changeTab(TAB_TYPE.DESCRIPTION)}
        >
          Описание
        </TabButton>
      </div>
      <div className={`group rounded-b-[20px] rounded-tr-[20px] bg-base-200 p-[20px] ${showMore ? 'show-more' : ''}`}>
        <div
          className='relative overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-[86px] after:bg-[linear-gradient(0deg,#f6f6f6_0%,rgba(246,246,246,0)100%)] group-[.show-more]:max-h-fit group-[.show-more]:after:hidden md:max-h-fit md:after:hidden'
          ref={blockRef}
        >
          {tab === TAB_TYPE.PROPERTIES ? propsTabContent : descTabContent}
        </div>
        <Button
          className='mt-[22px] w-full group-[.show-more]:hidden md:hidden'
          onClick={() => setShowMore(true)}
          variation='outline'
        >
          показать ещё
        </Button>
      </div>
    </>
  )
}

export default ObjectPropertiesWrapper
