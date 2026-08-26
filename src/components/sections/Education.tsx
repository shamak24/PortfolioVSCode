import { portfolio } from '@/data'
import { SectionReveal } from './SectionReveal'
import { EducationEntry } from './EducationEntry'

export function Education() {
  const section = portfolio.sections.find((s) => s.id === 'education')!
  const entries = portfolio.education

  return (
    <section id="education" className="portfolio-section">
      <SectionReveal className="sec-head">
        <span className="sec-num">{section.number}</span>
        <div className="eyebrow">{section.eyebrow}</div>
        <h2>{section.title}</h2>
      </SectionReveal>
      <div className="education-timeline" aria-label="Education timeline">
        {entries.map((entry, index) => (
          <EducationEntry
            key={entry.id}
            entry={entry}
            index={index}
            isLast={index === entries.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
