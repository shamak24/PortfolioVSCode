import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog'
import {
  HELP_MAC_NOTE,
  HELP_PALETTE_TIPS,
  HELP_SHORTCUTS,
  HELP_TERMINAL_COMMANDS,
  HELP_TERMINAL_TIPS,
} from '@/data/helpContent'

interface HelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="help-modal max-w-none">
        <div className="project-modal-header">
          <div className="project-modal-tabs">
            <div className="project-modal-tab">
              <span className="dot" />
              <span>help.md</span>
            </div>
          </div>
          <DialogClose asChild>
            <button type="button" className="project-modal-close" aria-label="Close help">
              ×
            </button>
          </DialogClose>
        </div>

        <div className="help-scroll">
          <section className="help-section">
            <h3>Keyboard shortcuts</h3>
            <ul className="help-shortcut-list">
              {HELP_SHORTCUTS.map((shortcut) => (
                <li key={shortcut.description} className="help-shortcut-row">
                  <span className="help-shortcut-desc">{shortcut.description}</span>
                  <span className="help-keys">
                    {shortcut.keys.map((key) => (
                      <kbd key={key}>{key}</kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="help-note">{HELP_MAC_NOTE}</p>
          </section>

          <section className="help-section">
            <h3>Go to anything</h3>
            <ul className="help-tip-list">
              {HELP_PALETTE_TIPS.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>

          <section className="help-section">
            <h3>Terminal</h3>
            <ul className="help-tip-list">
              {HELP_TERMINAL_TIPS.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <div className="help-cmd-block">
              <p className="help-cmd-heading">Available commands</p>
              <ul className="help-cmd-list">
                {HELP_TERMINAL_COMMANDS.map((entry) => (
                  <li key={entry.command} className="help-cmd-row">
                    <code className="help-cmd-name">{entry.command}</code>
                    <span className="help-cmd-desc">{entry.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
