import { portfolio } from '@/data'
import { useUIState } from '@/context/UIStateContext'
import { HeroCodeBlock } from './HeroCodeBlock'

export function Hero() {
  const { setResumeModalOpen } = useUIState()
  const { hero } = portfolio.profile

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="portfolio-section hero-section">
      <HeroCodeBlock />
      <h1 className="hero-title">{hero.headline}</h1>
      <p className="hero-sub">{hero.subheadline}</p>
      <div className="btn-row">
        <button type="button" onClick={() => scrollTo('projects')} className="btn btn-primary">
          View projects →
        </button>
        <button
          type="button"
          onClick={() => setResumeModalOpen(true)}
          className="btn btn-secondary"
        >
          View Résumé ↗
        </button>
        <button type="button" onClick={() => scrollTo('contact')} className="btn btn-secondary">
          Get in touch
        </button>
      </div>
    </section>
  )
}
