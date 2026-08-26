import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '@/data'
import { useUIState } from '@/context/UIStateContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { HeroCodeBlock } from './HeroCodeBlock'
import { HeroQuipRotator } from './HeroQuipRotator'

const ease: [number, number, number, number] = [0.16, 0.84, 0.44, 1]

export function Hero() {
  const { setResumeModalOpen } = useUIState()
  const { hero } = portfolio.profile
  const reducedMotion = useReducedMotion()
  const [showSub, setShowSub] = useState(reducedMotion)
  const [showQuip, setShowQuip] = useState(reducedMotion)
  const [showActions, setShowActions] = useState(reducedMotion)

  const titleWords = hero.headline.split(' ').filter(Boolean)
  const quips = hero.quips ?? []

  useEffect(() => {
    if (reducedMotion) return
    const subTimer = window.setTimeout(() => setShowSub(true), 520)
    const quipTimer = window.setTimeout(() => setShowQuip(true), 780)
    const actionsTimer = window.setTimeout(() => setShowActions(true), 980)
    return () => {
      clearTimeout(subTimer)
      clearTimeout(quipTimer)
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
        transition={{ duration: 0.45, ease }}
      >
        <div className="hero-title-block hero-title-success">
          <motion.span
            className="hero-success-pill"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease, delay: 0.05 }}
          >
            <span className="hero-success-icon">✓</span>
            build successful
          </motion.span>

          <h1 className="hero-title">
            {reducedMotion
              ? hero.headline
              : titleWords.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="hero-title-word"
                    initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.48,
                      ease,
                      delay: 0.1 + i * 0.065,
                    }}
                  >
                    {word}
                    {i < titleWords.length - 1 ? '\u00A0' : ''}
                  </motion.span>
                ))}
          </h1>
        </div>

        {showSub && (
          <motion.p
            className="hero-sub"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            {hero.subheadline}
          </motion.p>
        )}

        {showQuip && quips.length > 0 && (
          <motion.div
            className="hero-quip-block"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <HeroQuipRotator quips={quips} />
          </motion.div>
        )}

        {showActions && (
          <motion.div
            className="btn-row"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
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
