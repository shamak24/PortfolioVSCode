import { portfolio } from '@/data'
import { useUIState } from '@/context/UIStateContext'
import { SectionReveal } from './SectionReveal'

export function Contact() {
  const section = portfolio.sections.find((s) => s.id === 'contact')!
  const { profile } = portfolio
  const { setResumeModalOpen } = useUIState()

  return (
    <section id="contact" className="portfolio-section">
      <SectionReveal className="sec-head">
        <span className="sec-num">{section.number}</span>
        <div className="eyebrow">{section.eyebrow}</div>
        <h2>{section.title}</h2>
      </SectionReveal>
      <SectionReveal delay={0.06}>
        <div className="contact-block">
          <h2>{profile.contact.title}</h2>
          <p>{profile.contact.subtitle}</p>
          <div className="btn-row">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="btn btn-secondary"
            >
              Résumé ↗
            </button>
            {profile.social.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn btn-secondary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
