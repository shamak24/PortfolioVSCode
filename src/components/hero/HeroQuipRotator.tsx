import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const ease: [number, number, number, number] = [0.16, 0.84, 0.44, 1]

interface HeroQuipRotatorProps {
  quips: string[]
}

export function HeroQuipRotator({ quips }: HeroQuipRotatorProps) {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion || quips.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % quips.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [quips.length, reducedMotion])

  if (quips.length === 0) return null

  if (reducedMotion) {
    return <p className="hero-quip">{quips[0]}</p>
  }

  return (
    <div className="hero-quip-wrap" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={index}
          className="hero-quip"
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.38, ease }}
        >
          {quips[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
