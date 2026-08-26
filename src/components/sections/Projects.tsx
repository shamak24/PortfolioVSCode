import { portfolio } from '@/data'
import { SectionReveal } from './SectionReveal'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const section = portfolio.sections.find((s) => s.id === 'projects')!

  return (
    <section id="projects" className="portfolio-section">
      <SectionReveal className="sec-head">
        <span className="sec-num">{section.number}</span>
        <div className="eyebrow">{section.eyebrow}</div>
        <h2>{section.title}</h2>
      </SectionReveal>
      <div>
        {portfolio.projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
