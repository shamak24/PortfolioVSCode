import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog'
import type { Project } from '@/types/portfolio'
import { ProjectCard } from '@/components/sections/ProjectCard'

interface ProjectsAllDialogProps {
  projects: Project[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenProject: (project: Project) => void
}

export function ProjectsAllDialog({
  projects,
  open,
  onOpenChange,
  onOpenProject,
}: ProjectsAllDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="projects-all-modal max-w-none">
        <div className="project-modal-header">
          <div className="project-modal-tabs">
            <div className="project-modal-tab">
              <span className="dot" />
              <span>projects.tsx</span>
            </div>
          </div>
          <DialogClose asChild>
            <button type="button" className="project-modal-close" aria-label="Close all projects">
              ×
            </button>
          </DialogClose>
        </div>

        <div className="projects-all-scroll">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={onOpenProject}
              animateImmediately
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
