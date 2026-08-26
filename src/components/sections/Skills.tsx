import { portfolio } from '@/data'
import { SkillCategory } from './SkillCategory'
import { SectionReveal } from './SectionReveal'

export function Skills() {
  const section = portfolio.sections.find((s) => s.id === 'skills')!

  return (
    <section id="skills" className="portfolio-section">
      <SectionReveal className="sec-head">
        <span className="sec-num">{section.number}</span>
        <div className="eyebrow">{section.eyebrow}</div>
        <h2>{section.title}</h2>
      </SectionReveal>
      <div className="skill-grid">
        {portfolio.skills.map((category, i) => (
          <SkillCategory key={category.name} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}
