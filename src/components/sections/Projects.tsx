import { useState } from 'react'
import { portfolio } from '@/data'
import type { Project } from '@/types/portfolio'
import { SectionReveal } from './SectionReveal'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from '@/components/projects/ProjectModal'

export function Projects() {
  const section = portfolio.sections.find((s) => s.id === 'projects')!
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const handleModalChange = (open: boolean) => {
    setModalOpen(open)
    if (!open) setSelectedProject(null)
  }

  return (
    <section id="projects" className="portfolio-section">
      <SectionReveal className="sec-head">
        <span className="sec-num">{section.number}</span>
        <div className="eyebrow">{section.eyebrow}</div>
        <h2>{section.title}</h2>
      </SectionReveal>
      <div>
        {portfolio.projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} onOpen={openProject} />
        ))}
      </div>
      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={handleModalChange}
      />
    </section>
  )
}
