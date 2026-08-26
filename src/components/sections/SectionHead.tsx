import { motion } from 'framer-motion'
import type { Section } from '@/types/portfolio'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const ease: [number, number, number, number] = [0.16, 0.84, 0.44, 1]

const headVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

const numVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

const eyebrowVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
}

const titleWordVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease },
  },
}

export function SectionHead({ section }: { section: Section }) {
  const reducedMotion = useReducedMotion()
  const titleWords = section.title.split(' ').filter(Boolean)

  if (reducedMotion) {
    return (
      <div className="sec-head">
        {section.number && (
          <span className="sec-num" data-accent={section.accent}>{section.number}</span>
        )}
        <div className="sec-head-body">
          {section.eyebrow && <div className="eyebrow">{section.eyebrow}</div>}
          {section.title && <h2>{section.title}</h2>}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="sec-head"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -40px 0px' }}
      variants={headVariants}
    >
      {section.number && (
        <motion.span className="sec-num" data-accent={section.accent} variants={numVariants}>
          {section.number}
        </motion.span>
      )}
      <div className="sec-head-body">
        {section.eyebrow && (
          <motion.div className="eyebrow" variants={eyebrowVariants}>
            {section.eyebrow}
          </motion.div>
        )}
        {section.title && (
          <h2>
            {titleWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="sec-title-word"
                variants={titleWordVariants}
              >
                {word}
                {i < titleWords.length - 1 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </h2>
        )}
      </div>
    </motion.div>
  )
}
