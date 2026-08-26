import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import { useUIState } from '@/context/UIStateContext'
import { portfolio } from '@/data'
import { handleTerminalCommand } from './terminalCommands'
import { TerminalOutput } from './TerminalOutput'

interface OutputEntry {
  id: number
  type: 'echo' | 'output' | 'boot'
  text?: string
  className?: string
}

export function Terminal() {
  const { terminalOpen, setTerminalOpen } = useUIState()
  const { setThemeId } = useTheme()
  const { setLanguageId } = useLanguage()
  const [entries, setEntries] = useState<OutputEntry[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [booted, setBooted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  const scrollToBottom = useCallback(() => {
    const el = bodyRef.current
    if (!el) return
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight
      })
    })
  }, [])

  useEffect(() => {
    if (terminalOpen && entries.length > 0) {
      scrollToBottom()
    }
  }, [entries, terminalOpen, scrollToBottom])

  const bootTerminal = useCallback(async () => {
    const add = (entry: Omit<OutputEntry, 'id'>) => {
      idRef.current += 1
      setEntries((prev) => [...prev, { ...entry, id: idRef.current }])
    }

    await new Promise((r) => setTimeout(r, 0))
    add({ type: 'boot', text: '$ whoami', className: 'term-line-cmd' })
    await new Promise((r) => setTimeout(r, 120))
    add({
      type: 'output',
      text: `${portfolio.profile.name.toLowerCase().replace(/\s+/g, '-')} — ${portfolio.profile.role.toLowerCase()}`,
      className: 'term-dim',
    })
    await new Promise((r) => setTimeout(r, 220))
    add({ type: 'boot', text: '$ cat bio.txt', className: 'term-line-cmd' })
    await new Promise((r) => setTimeout(r, 120))
    add({ type: 'output', text: portfolio.profile.hero.headline, className: 'term-dim' })
    await new Promise((r) => setTimeout(r, 80))
    add({ type: 'output', text: '', className: '' })
    add({ type: 'output', text: 'Type "help" to see available commands.', className: 'term-highlight' })
  }, [])

  useEffect(() => {
    if (terminalOpen && !booted) {
      setBooted(true)
      bootTerminal()
    }
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [terminalOpen, booted, bootTerminal])

  const runCommand = (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    if (trimmed.toLowerCase() === 'clear') {
      setEntries([])
      return
    }

    const newEntries: OutputEntry[] = []
    idRef.current += 1
    newEntries.push({
      id: idRef.current,
      type: 'echo',
      text: trimmed,
    })

    const results = handleTerminalCommand(trimmed, {
      setThemeId,
      setLanguageId,
      closeTerminal: () => setTerminalOpen(false),
    })

    for (const line of results) {
      idRef.current += 1
      newEntries.push({
        id: idRef.current,
        type: 'output',
        text: line.text,
        className: line.className,
      })
    }

    setEntries((prev) => [...prev, ...newEntries])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      if (input.trim()) {
        setHistory((h) => [...h, input])
      }
      setHistoryIndex(history.length + 1)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex] ?? '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex] ?? '')
      } else {
        setHistoryIndex(history.length)
        setInput('')
      }
    }
  }

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="app-terminal"
        >
          <div className="app-terminal-header">
            <div className="flex h-full">
              <div className="app-terminal-tab">bash</div>
            </div>
            <button
              type="button"
              onClick={() => setTerminalOpen(false)}
              aria-label="Close terminal"
              className="app-terminal-close"
            >
              ×
            </button>
          </div>
          <div ref={bodyRef} className="app-terminal-body">
            <TerminalOutput entries={entries} />
            <div className="app-terminal-input-row">
              <span className="app-terminal-prompt">
                alex@portfolio<span className="term-path">~/portfolio</span>$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
