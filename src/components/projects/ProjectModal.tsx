import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog'
import type { Project } from '@/types/portfolio'

interface ProjectModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null

  const longDescription =
    project.longDescription?.length > 0 ? project.longDescription : [project.description]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="project-modal max-w-none">
        <div className="project-modal-header">
          <div className="project-modal-tabs">
            <div className="project-modal-tab">
              <span className="dot" />
              <span>{project.id}.tsx</span>
            </div>
          </div>
          <DialogClose asChild>
            <button type="button" className="project-modal-close" aria-label="Close project details">
              ×
            </button>
          </DialogClose>
        </div>

        <div className="project-modal-scroll">
          <div
            className="project-modal-hero"
            style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
          >
            <div className="project-modal-hero-content">
              <h3>{project.name}</h3>
              <span className="project-modal-meta">
                {project.status ? `${project.date} — ${project.status}` : project.date}
              </span>
            </div>
          </div>

          <div className="project-modal-body">
            <div className="project-modal-description">
              {longDescription.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="tag-row">
              {project.tech.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {(project.liveDemo || project.github) && (
          <div className="project-modal-footer">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
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
                className="btn btn-secondary"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub repo ↗
              </a>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
