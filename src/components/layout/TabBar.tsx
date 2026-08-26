import { motion } from 'framer-motion'
import { portfolio } from '@/data'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

interface TabBarProps {
  activeSection: string
}

export function TabBar({ activeSection }: TabBarProps) {
  const { language } = useLanguage()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="app-tabbar">
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
  )
}
