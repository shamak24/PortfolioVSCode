import { motion } from 'framer-motion'
import { portfolio } from '@/data'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SectionHead } from './SectionHead'

const ease: [number, number, number, number] = [0.16, 0.84, 0.44, 1]

export function About() {
  const section = portfolio.sections.find((s) => s.id === 'about')!
  const { bio } = portfolio.profile
  const reducedMotion = useReducedMotion()

  return (
    <section id="about" className="portfolio-section">
      <SectionHead section={section} />
      <div className="about-bio">
        {bio.map((paragraph, i) =>
          reducedMotion ? (
            <p key={i}>{paragraph}</p>
          ) : (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            >
              {paragraph}
            </motion.p>
          ),
        )}
      </div>
    </section>
  )
}
