import { useState } from 'react'
import { portfolio } from '@/data'
import type { Project } from '@/types/portfolio'
import { SectionHead } from './SectionHead'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from '@/components/projects/ProjectModal'
import { ProjectsAllDialog } from '@/components/projects/ProjectsAllDialog'

const PREVIEW_LIMIT = 2

export function Projects() {
  const section = portfolio.sections.find((s) => s.id === 'projects')!
  const projects = portfolio.projects
  const hasMoreProjects = projects.length > PREVIEW_LIMIT

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [allProjectsOpen, setAllProjectsOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const handleModalChange = (open: boolean) => {
    setModalOpen(open)
    if (!open) setSelectedProject(null)
  }

  const previewProjects = hasMoreProjects ? projects.slice(0, PREVIEW_LIMIT) : projects

  return (
    <section id="projects" className="portfolio-section">
      <SectionHead section={section} />

      <div className="projects-preview">
        <div className="projects-preview-list">
          {previewProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={openProject} />
          ))}
        </div>

        {hasMoreProjects && (
          <div className="projects-preview-cta">
            <button
              type="button"
              className="btn btn-primary projects-view-all-btn"
              onClick={() => setAllProjectsOpen(true)}
            >
              View all projects →
            </button>
          </div>
        )}
      </div>

      <ProjectsAllDialog
        projects={projects}
        open={allProjectsOpen}
        onOpenChange={setAllProjectsOpen}
        onOpenProject={openProject}
      />

      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={handleModalChange}
      />
    </section>
  )
}
