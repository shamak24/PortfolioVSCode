import { portfolio } from '@/data'
import { SkillCategory } from './SkillCategory'
import { SectionHead } from './SectionHead'

export function Skills() {
  const section = portfolio.sections.find((s) => s.id === 'skills')!

  return (
    <section id="skills" className="portfolio-section">
      <SectionHead section={section} />
      <div className="skills-panel">
        {portfolio.skills.map((category, i) => (
          <SkillCategory key={category.name} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}
