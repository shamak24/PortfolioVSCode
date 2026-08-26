import { portfolio } from '@/data'
import { SectionReveal } from './SectionReveal'

export function About() {
  const section = portfolio.sections.find((s) => s.id === 'about')!
  const { bio } = portfolio.profile

  return (
    <section id="about" className="portfolio-section">
      <SectionReveal className="sec-head">
        <span className="sec-num">{section.number}</span>
        <div className="eyebrow">{section.eyebrow}</div>
        <h2>{section.title}</h2>
      </SectionReveal>
      <SectionReveal delay={0.06} className="about-bio">
        {bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </SectionReveal>
    </section>
  )
}
