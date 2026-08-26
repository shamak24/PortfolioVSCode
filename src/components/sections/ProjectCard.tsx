import { motion } from 'framer-motion'
import type { Project } from '@/types/portfolio'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reducedMotion = useReducedMotion()
  const meta = project.status ? `${project.date} — ${project.status}` : project.date

  const content = (
    <article className="project-card">
      <div className="project-top">
        <h3>{project.name}</h3>
        <span className="project-meta">{meta}</span>
      </div>
      <p className="desc">{project.description}</p>
      <div className="tag-row">
        {project.tech.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      {project.links && project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-blue hover:text-text-bright"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
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
