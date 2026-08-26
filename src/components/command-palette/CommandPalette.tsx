import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import { useUIState } from '@/context/UIStateContext'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { buildCommands, filterCommands } from './commands'
import { CommandList } from './CommandList'

export function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    toggleCommandPalette,
    toggleTerminal,
    showToast,
  } = useUIState()
  const { theme, setThemeId } = useTheme()
  const { language, setLanguageId } = useLanguage()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const allCommands = useMemo(
    () =>
      buildCommands({
        themeId: theme.id,
        languageId: language.id,
        onThemeChange: setThemeId,
        onLanguageChange: setLanguageId,
        onToggleTerminal: toggleTerminal,
        showToast,
      }),
    [theme.id, language.id, setThemeId, setLanguageId, toggleTerminal, showToast],
  )

  const filtered = useMemo(() => filterCommands(allCommands, query), [allCommands, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const close = useCallback(() => {
    setCommandPaletteOpen(false)
    setQuery('')
  }, [setCommandPaletteOpen])

  const runActive = useCallback(() => {
    const cmd = filtered[activeIndex]
    if (!cmd) return
    close()
    cmd.run()
  }, [filtered, activeIndex, close])

  useKeyboardShortcut(
    useCallback(
      (e) => {
        const mod = e.metaKey || e.ctrlKey
        const key = e.key.toLowerCase()
        if (mod && key === 'k') {
          e.preventDefault()
          toggleCommandPalette()
        } else if (mod && e.shiftKey && key === 'p') {
          e.preventDefault()
          toggleCommandPalette()
        } else if (mod && e.key === '`') {
          e.preventDefault()
          toggleTerminal()
        }
      },
      [toggleCommandPalette, toggleTerminal],
    ),
  )

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runActive()
    } else if (e.key === 'Escape') {
      close()
    }
  }

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="cmdk-overlay fixed inset-0 z-[100] flex items-start justify-center bg-[rgba(3,5,9,0.6)] backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="cmdk-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmdk-input-row">
              <span className="prefix">&gt;</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Type a command…"
                autoComplete="off"
                spellCheck={false}
                autoFocus
              />
            </div>
            <CommandList
              commands={filtered}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              onRun={(cmd) => {
                close()
                cmd.run()
              }}
            />
            <div className="cmdk-footer">
              <span>
                <kbd>↑↓</kbd> navigate
              </span>
              <span>
                <kbd>↵</kbd> select
              </span>
              <span>
                <kbd>esc</kbd> close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
