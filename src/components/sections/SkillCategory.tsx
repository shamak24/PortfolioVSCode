import { motion } from 'framer-motion'
import type { SkillCategory as SkillCategoryType } from '@/types/portfolio'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SkillCategoryProps {
  category: SkillCategoryType
  index: number
}

export function SkillCategory({ category, index }: SkillCategoryProps) {
  const reducedMotion = useReducedMotion()

  const content = (
    <div className="skill-category">
      <h4>{category.name}</h4>
      <div className="tag-row">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="tag"
            data-accent={skill.accentColor ? true : undefined}
            style={skill.accentColor ? { borderLeftColor: skill.accentColor } : undefined}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )

  if (reducedMotion) return content

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.6,
        ease: [0.16, 0.84, 0.44, 1],
        delay: Math.min(index * 0.06, 0.24),
      }}
    >
      {content}
    </motion.div>
  )
}
