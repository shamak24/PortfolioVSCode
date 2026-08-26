import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      variants={sectionVariants}
      transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
