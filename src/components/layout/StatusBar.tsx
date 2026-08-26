import { ThemePicker } from '@/components/pickers/ThemePicker'
import { LanguagePicker } from '@/components/pickers/LanguagePicker'
import { useUIState } from '@/context/UIStateContext'

export function StatusBar() {
  const { toggleCommandPalette, toggleTerminal } = useUIState()

  return (
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
        <ThemePicker />
        <LanguagePicker />
      </div>
    </div>
  )
}
