import { createContext, useContext, useState, type ReactNode } from 'react'

interface UIStateContextValue {
  bootComplete: boolean
  setBootComplete: (complete: boolean) => void
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
  terminalOpen: boolean
  setTerminalOpen: (open: boolean) => void
  resumeModalOpen: boolean
  setResumeModalOpen: (open: boolean) => void
  toast: string | null
  showToast: (message: string) => void
  toggleTerminal: () => void
  toggleCommandPalette: () => void
}

const UIStateContext = createContext<UIStateContextValue | null>(null)

export function UIStateProvider({ children }: { children: ReactNode }) {
  const [bootComplete, setBootComplete] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [resumeModalOpen, setResumeModalOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 1800)
  }

  const toggleTerminal = () => setTerminalOpen((o) => !o)
  const toggleCommandPalette = () => setCommandPaletteOpen((o) => !o)

  return (
    <UIStateContext.Provider
      value={{
        bootComplete,
        setBootComplete,
        commandPaletteOpen,
        setCommandPaletteOpen,
        terminalOpen,
        setTerminalOpen,
        resumeModalOpen,
        setResumeModalOpen,
        toast,
        showToast,
        toggleTerminal,
        toggleCommandPalette,
      }}
    >
      {children}
    </UIStateContext.Provider>
  )
}

export function useUIState() {
  const ctx = useContext(UIStateContext)
  if (!ctx) throw new Error('useUIState must be used within UIStateProvider')
  return ctx
}
