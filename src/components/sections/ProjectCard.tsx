import { motion } from 'framer-motion'
import type { Project } from '@/types/portfolio'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reducedMotion = useReducedMotion()
  const meta = project.status ? `${project.date} — ${project.status}` : project.date
  const hasLinks = project.liveDemo || project.github

  const content = (
    <article
      className="project-card"
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(project)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.name}`}
    >
      <div className="project-top">
        <div className="project-top-main">
          <h3>{project.name}</h3>
          <span className="project-meta">{meta}</span>
        </div>
        {hasLinks && (
          <div className="project-links">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Live demo ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>
      <p className="desc">{project.description}</p>
      <div className="tag-row">
        {project.tech.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </article>
  )

  if (reducedMotion) return content

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.6,
        ease: [0.16, 0.84, 0.44, 1],
        delay: Math.min(index * 0.06, 0.24),
      }}
    >
      {content}
    </motion.div>
  )
}
