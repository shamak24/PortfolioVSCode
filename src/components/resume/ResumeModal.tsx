import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog'
import {
  portfolio,
  getResumePreviewUrl,
  getResumeDownloadUrl,
  getResumeFilename,
} from '@/data'
import { useUIState } from '@/context/UIStateContext'

export function ResumeModal() {
  const { resumeModalOpen, setResumeModalOpen } = useUIState()
  const fileId = portfolio.resume.googleDriveFileId
  const previewUrl = getResumePreviewUrl(fileId)
  const downloadUrl = getResumeDownloadUrl(fileId)
  const filename = getResumeFilename(portfolio.profile.name)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={resumeModalOpen} onOpenChange={setResumeModalOpen}>
      <DialogContent className="resume-modal">
        <div className="resume-modal-header">
          <div className="resume-modal-tabs">
            <div className="resume-modal-tab">
              <span className="dot" />
              <span>resume.pdf</span>
            </div>
          </div>
          <div className="resume-modal-actions">
            <DialogClose asChild>
              <button type="button" className="resume-modal-close" aria-label="Close preview">
                ×
              </button>
            </DialogClose>
          </div>
        </div>

        <div className="resume-modal-body">
          <div className="resume-modal-frame">
            <iframe src={previewUrl} title="Resume preview" />
          </div>
        </div>

        <div className="resume-modal-footer">
          <button type="button" onClick={handleDownload} className="btn btn-primary">
            Download ↓
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
