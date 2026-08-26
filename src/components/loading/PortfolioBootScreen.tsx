import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useUIState } from '@/context/UIStateContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface BootLine {
  text: string
  className?: string
  delay: number
}

const BOOT_LINES: BootLine[] = [
  { text: '$ bun run dev', className: 'hero-boot-dim', delay: 0 },
  { text: '> portfoliovscode@0.0.0 dev', className: 'hero-boot-dim', delay: 380 },
  { text: '> vite', className: 'hero-boot-dim', delay: 720 },
  { text: '', delay: 920 },
  { text: '  VITE v8.2  ready in 318 ms', className: 'hero-boot-amber', delay: 1080 },
  { text: '', delay: 1280 },
  { text: '  ➜  Local:   http://localhost:5173/', className: 'hero-boot-url', delay: 1480 },
  { text: '✓ Dev server ready — loading portfolio', className: 'hero-boot-success', delay: 1880 },
]

export function PortfolioBootScreen() {
  const { setBootComplete } = useUIState()
  const reducedMotion = useReducedMotion()
  const [visibleCount, setVisibleCount] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setBootComplete(true)
      return
    }

    const timers = BOOT_LINES.map((line, index) =>
      window.setTimeout(() => {
        setVisibleCount(index + 1)
      }, line.delay),
    )

    const exitTimer = window.setTimeout(() => {
      setExiting(true)
    }, BOOT_LINES[BOOT_LINES.length - 1].delay + 480)

    const doneTimer = window.setTimeout(() => {
      setBootComplete(true)
    }, BOOT_LINES[BOOT_LINES.length - 1].delay + 900)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [reducedMotion, setBootComplete])

  if (reducedMotion) return null

  return (
    <motion.div
      className="portfolio-boot-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      aria-live="polite"
      aria-label="Starting dev server"
    >
      <div className="portfolio-boot-screen-grid" aria-hidden="true" />
      <div className="portfolio-boot-panel">
        <div className="portfolio-boot-panel-header">
          <span className="portfolio-boot-panel-dot" />
          <span>terminal — portfolio dev server</span>
        </div>
        <div className="portfolio-boot-panel-body">
          {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
            <div
              key={i}
              className={cn('hero-boot-line', line.className, 'hero-boot-line-in')}
            >
              {line.text || '\u00A0'}
            </div>
          ))}
          {visibleCount < BOOT_LINES.length && (
            <div className="hero-boot-line hero-boot-cursor-line">
              <span className="hero-boot-cursor" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
