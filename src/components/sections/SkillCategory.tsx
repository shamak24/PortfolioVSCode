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
    <div className="skills-panel-row">
      <h4 className="skills-panel-label">{category.name}</h4>
      <div className="skills-panel-tags">
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
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.5,
        ease: [0.16, 0.84, 0.44, 1],
        delay: Math.min(index * 0.05, 0.25),
      }}
    >
      {content}
    </motion.div>
  )
}
