import { portfolio } from '@/data'

export interface CommandItem {
  id: string
  icon: string
  label: string
  category: string
  checked?: boolean
  run: () => void
}

interface BuildCommandsOptions {
  themeId: string
  languageId: string
  onThemeChange: (id: string) => void
  onLanguageChange: (id: string) => void
  onToggleTerminal: () => void
  showToast: (msg: string) => void
}

export function buildCommands(options: BuildCommandsOptions): CommandItem[] {
  const {
    themeId,
    languageId,
    onThemeChange,
    onLanguageChange,
    onToggleTerminal,
    showToast,
  } = options

  const cmds: CommandItem[] = []

  portfolio.sections.forEach((section) => {
    const capitalized = section.label.charAt(0).toUpperCase() + section.label.slice(1)
    cmds.push({
      id: `nav-${section.id}`,
      icon: '→',
      label: `Go to: ${capitalized}`,
      category: 'Navigate',
      run: () => {
        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
      },
    })
  })

  portfolio.languages.forEach((lang) => {
    cmds.push({
      id: `lang-${lang.id}`,
      icon: '{}',
      label: `Change Language: ${lang.label}`,
      category: 'Language',
      checked: lang.id === languageId,
      run: () => {
        onLanguageChange(lang.id)
        showToast(`Language set to ${lang.label}`)
      },
    })
  })

  portfolio.themes.forEach((theme) => {
    cmds.push({
      id: `theme-${theme.id}`,
      icon: '◐',
      label: `Change Theme: ${theme.label}`,
      category: 'Theme',
      checked: theme.id === themeId,
      run: () => {
        onThemeChange(theme.id)
        showToast(`Theme set to ${theme.label}`)
      },
    })
  })

  cmds.push({
    id: 'copy-email',
    icon: '✉',
    label: 'Copy Email Address',
    category: 'Action',
    run: () => {
      const email = portfolio.profile.email
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(email)
          .then(() => showToast('Email copied to clipboard'))
          .catch(() => showToast(email))
      } else {
        showToast(email)
      }
    },
  })

  cmds.push({
    id: 'scroll-top',
    icon: '↑',
    label: 'Scroll to Top',
    category: 'Action',
    run: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  })

  cmds.push({
    id: 'toggle-terminal',
    icon: '>_',
    label: 'Toggle Terminal',
    category: 'Action',
    run: onToggleTerminal,
  })

  return cmds
}

export function filterCommands(commands: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return commands
  return commands.filter(
    (c) => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q),
  )
}
