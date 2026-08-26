import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '@/data'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

interface TabBarProps {
  activeSection: string
}

export function TabBar({ activeSection }: TabBarProps) {
  const { language } = useLanguage()
  const navRef = useRef<HTMLElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = navRef.current
    if (!el) return
    const { scrollLeft, clientWidth, scrollWidth } = el
    const overflow = scrollWidth > clientWidth + 1
    setCanScrollLeft(overflow && scrollLeft > 4)
    setCanScrollRight(overflow && scrollLeft + clientWidth < scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = navRef.current
    if (!el) return

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(el)

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      observer.disconnect()
    }
  }, [updateScrollState, language.ext])

  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const activeTab = el.querySelector('.app-tab.active')
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    }
    window.setTimeout(updateScrollState, 300)
  }, [activeSection, updateScrollState])

  const scrollTabs = (direction: 'left' | 'right') => {
    const el = navRef.current
    if (!el) return
    el.scrollBy({ left: direction === 'left' ? -140 : 140, behavior: 'smooth' })
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const showArrows = canScrollLeft || canScrollRight

  return (
    <div className={cn('app-tabbar-wrap', showArrows && 'has-overflow')}>
      <button
        type="button"
        className="app-tabbar-arrow app-tabbar-arrow-left"
        aria-label="Scroll tabs left"
        hidden={!canScrollLeft}
        onClick={() => scrollTabs('left')}
      >
        ‹
      </button>
      <nav ref={navRef} className="app-tabbar" aria-label="Section tabs">
        {portfolio.sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              className={cn('app-tab', isActive && 'active')}
            >
              <span className="dot" />
              <span>{section.label}</span>.<span>{language.ext}</span>
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-amber"
                  transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                />
              )}
            </button>
          )
        })}
      </nav>
      <button
        type="button"
        className="app-tabbar-arrow app-tabbar-arrow-right"
        aria-label="Scroll tabs right"
        hidden={!canScrollRight}
        onClick={() => scrollTabs('right')}
      >
        ›
      </button>
    </div>
  )
}
