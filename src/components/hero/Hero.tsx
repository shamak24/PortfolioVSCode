import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '@/data'
import { useUIState } from '@/context/UIStateContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { HeroCodeBlock } from './HeroCodeBlock'

export function Hero() {
  const { setResumeModalOpen } = useUIState()
  const { hero } = portfolio.profile
  const reducedMotion = useReducedMotion()
  const [showSub, setShowSub] = useState(reducedMotion)
  const [showActions, setShowActions] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return
    const subTimer = window.setTimeout(() => setShowSub(true), 450)
    const actionsTimer = window.setTimeout(() => setShowActions(true), 720)
    return () => {
      clearTimeout(subTimer)
      clearTimeout(actionsTimer)
    }
  }, [reducedMotion])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="portfolio-section hero-section">
      <HeroCodeBlock />
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 0.84, 0.44, 1] }}
      >
        <div className="hero-title-block hero-title-success">
          <span className="hero-success-pill">
            <span className="hero-success-icon">✓</span>
            build successful
          </span>
          <h1 className="hero-title">{hero.headline}</h1>
        </div>

        {showSub && (
          <motion.p
            className="hero-sub"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 0.84, 0.44, 1] }}
          >
            {hero.subheadline}
          </motion.p>
        )}

        {showActions && (
          <motion.div
            className="btn-row"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 0.84, 0.44, 1] }}
          >
            <button type="button" onClick={() => scrollTo('projects')} className="btn btn-primary">
              View projects →
            </button>
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="btn btn-secondary"
            >
              View Résumé ↗
            </button>
            <button type="button" onClick={() => scrollTo('contact')} className="btn btn-secondary">
              Get in touch
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
