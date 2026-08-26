import { motion } from 'framer-motion'
import type { EducationEntry as EducationEntryType } from '@/types/portfolio'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface EducationEntryProps {
  entry: EducationEntryType
  index: number
  isLast: boolean
}

export function EducationEntry({ entry, index, isLast }: EducationEntryProps) {
  const reducedMotion = useReducedMotion()

  const content = (
    <div className="education-entry">
      <div className="education-track-col" aria-hidden="true">
        <div className={cn('education-node', `education-node--${entry.id}`)} />
        {!isLast && <div className="education-connector" />}
      </div>
      <article className="education-card">
        <div className="education-card-top">
          <span className={cn('education-level', `education-level--${entry.id}`)}>{entry.level}</span>
          <time className="education-period">{entry.period}</time>
        </div>
        <h3 className="education-school">{entry.school}</h3>
        {entry.course && <p className="education-course">{entry.course}</p>}
      </article>
    </div>
  )

  if (reducedMotion) return content

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.55,
        ease: [0.16, 0.84, 0.44, 1],
        delay: Math.min(index * 0.1, 0.3),
      }}
    >
      {content}
    </motion.div>
  )
}
