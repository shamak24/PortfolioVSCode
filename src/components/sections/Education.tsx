import { portfolio } from '@/data'
import { SectionHead } from './SectionHead'
import { EducationEntry } from './EducationEntry'

export function Education() {
  const section = portfolio.sections.find((s) => s.id === 'education')!
  const entries = portfolio.education

  return (
    <section id="education" className="portfolio-section">
      <SectionHead section={section} />
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
