import { useState } from 'react'
import { ThemePicker } from '@/components/pickers/ThemePicker'
import { LanguagePicker } from '@/components/pickers/LanguagePicker'
import { HelpDialog } from '@/components/help/HelpDialog'
import { useUIState } from '@/context/UIStateContext'

export function StatusBar() {
  const { toggleCommandPalette, toggleTerminal } = useUIState()
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <>
      <div className="app-statusbar">
        <div className="app-statusbar-left">
          <span className="status-meta">⎇ main</span>
          <span className="status-meta">UTF-8</span>
          <button
            type="button"
            onClick={toggleCommandPalette}
            title="Command palette"
            className="app-statusbar-btn"
          >
            <span>⌕</span>
            <span className="btn-label">Go to anything</span>
          </button>
          <button
            type="button"
            onClick={toggleTerminal}
            title="Toggle terminal"
            className="app-statusbar-btn"
          >
            <span>&gt;_</span>
            <span className="btn-label">Terminal</span>
          </button>
        </div>
        <div className="app-statusbar-right">
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            title="Help & shortcuts"
            className="app-statusbar-btn app-statusbar-help-btn"
            aria-label="Help and keyboard shortcuts"
          >
            <span className="help-btn-icon" aria-hidden="true">?</span>
            <span className="btn-label">Help</span>
          </button>
          <ThemePicker />
          <LanguagePicker />
        </div>
      </div>

      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </>
  )
}
