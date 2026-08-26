import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { portfolio } from '@/data'
import type { Theme } from '@/types/portfolio'
import { useLocalStorageString } from '@/hooks/useLocalStorage'

interface ThemeContextValue {
  theme: Theme
  themes: Theme[]
  setThemeId: (id: string) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyThemeColors(theme: Theme) {
  const root = document.documentElement
  const c = theme.colors
  root.style.setProperty('--bg', c.bg)
  root.style.setProperty('--panel', c.panel)
  root.style.setProperty('--panel-2', c.panel2)
  root.style.setProperty('--line', c.line)
  root.style.setProperty('--text', c.text)
  root.style.setProperty('--text-dim', c.textDim)
  root.style.setProperty('--text-bright', c.textBright)
  root.style.setProperty('--amber', c.amber)
  root.style.setProperty('--purple', c.purple)
  root.style.setProperty('--green', c.green)
  root.style.setProperty('--blue', c.blue)

  const isLight = isLightTheme(c.bg)
  root.style.colorScheme = isLight ? 'light' : 'dark'
}

function isLightTheme(bg: string): boolean {
  const hex = bg.replace('#', '')
  if (hex.length !== 6) return false
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6
}

const DEFAULT_THEME_ID = 'catppuccin'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themes = portfolio.themes
  const [themeId, setThemeId] = useLocalStorageString('portfolio-theme', DEFAULT_THEME_ID)

  const theme = themes.find((t) => t.id === themeId) ?? themes[0]

  useEffect(() => {
    applyThemeColors(theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themes,
        setThemeId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
