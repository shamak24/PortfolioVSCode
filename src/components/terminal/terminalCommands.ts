import { portfolio } from '@/data'

export interface TerminalLine {
  text: string
  className?: string
  html?: string
}

interface TerminalContext {
  setThemeId: (id: string) => void
  setLanguageId: (id: string) => void
  closeTerminal: () => void
}

export const TERM_HELP = [
  'help              show this list',
  'about             jump to About',
  'skills            jump to Skills',
  'projects          list projects',
  'contact           jump to Contact',
  'ls                list section files',
  'cat <file>        print a section as a file',
  'theme <name>      switch theme, e.g. theme dracula',
  'lang <name>       switch language, e.g. lang python',
  'email             copy email to clipboard',
  'clear             clear the terminal',
  'exit              close the terminal',
]

function buildTermFiles(): Record<string, string> {
  const { profile, projects } = portfolio
  return {
    'home.tsx': `const developer = { name: "${profile.name}", role: "${profile.role}", available: ${profile.available} };`,
    'about.tsx': profile.bio[0] ?? '',
    'skills.tsx': 'Languages, frameworks, databases, libraries, infra & tools — run "skills" to jump there.',
    'projects.tsx': projects.map((p) => p.name).join(' · ') + ' — run "projects" to jump there.',
    'contact.tsx': `${profile.email} — ${profile.availability}`,
  }
}

export function handleTerminalCommand(
  raw: string,
  ctx: TerminalContext,
): TerminalLine[] {
  const cmd = raw.trim()
  if (!cmd) return []

  const lines: TerminalLine[] = []
  const [name, ...rest] = cmd.split(' ')
  const arg = rest.join(' ').trim().toLowerCase()
  const termFiles = buildTermFiles()

  switch (name.toLowerCase()) {
    case 'help':
      TERM_HELP.forEach((line) => lines.push({ text: line, className: 'term-dim' }))
      break
    case 'whoami':
      lines.push({ text: portfolio.profile.name.toLowerCase().replace(/\s+/g, '-'), className: 'term-highlight' })
      break
    case 'ls':
      lines.push({
        text: 'home.tsx  about.tsx  skills.tsx  projects.tsx  contact.tsx',
        className: 'term-highlight',
      })
      break
    case 'cat': {
      if (!arg) {
        lines.push({ text: 'usage: cat <file>', className: 'term-error' })
        break
      }
      const key = termFiles[arg] ? arg : termFiles[`${arg}.tsx`] ? `${arg}.tsx` : null
      if (key) lines.push({ text: termFiles[key], className: 'term-dim' })
      else lines.push({ text: `cat: ${arg}: No such file`, className: 'term-error' })
      break
    }
    case 'about':
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      lines.push({ text: 'Opening about.tsx…', className: 'term-dim' })
      break
    case 'skills':
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
      lines.push({ text: 'Opening skills.tsx…', className: 'term-dim' })
      break
    case 'projects':
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      lines.push({
        text: portfolio.projects.map((p) => p.name).join(' · '),
        className: 'term-dim',
      })
      break
    case 'contact':
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      lines.push({ text: 'Opening contact.tsx…', className: 'term-dim' })
      break
    case 'theme': {
      if (!arg) {
        lines.push({ text: 'usage: theme <name>  (e.g. theme dracula)', className: 'term-error' })
        break
      }
      const match = portfolio.themes.find(
        (t) => t.id.includes(arg) || t.label.toLowerCase().includes(arg),
      )
      if (match) {
        ctx.setThemeId(match.id)
        lines.push({ text: `Theme set to ${match.label}`, className: 'term-highlight' })
      } else {
        lines.push({ text: `theme not found: ${arg}`, className: 'term-error' })
      }
      break
    }
    case 'lang': {
      if (!arg) {
        lines.push({ text: 'usage: lang <name>  (e.g. lang python)', className: 'term-error' })
        break
      }
      const match = portfolio.languages.find(
        (l) => l.id === arg || l.label.toLowerCase().includes(arg),
      )
      if (match) {
        ctx.setLanguageId(match.id)
        lines.push({ text: `Language set to ${match.label}`, className: 'term-highlight' })
      } else {
        lines.push({ text: `language not found: ${arg}`, className: 'term-error' })
      }
      break
    }
    case 'email': {
      const email = portfolio.profile.email
      lines.push({ text: email, className: 'term-highlight' })
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).catch(() => {})
      }
      break
    }
    case 'clear':
      break
    case 'exit':
    case 'close':
      ctx.closeTerminal()
      break
    case 'sudo':
      lines.push({ text: 'Nice try. Permission denied.', className: 'term-error' })
      break
    default:
      lines.push({ text: `command not found: ${name}`, className: 'term-error' })
      lines.push({ text: 'Type "help" for a list of commands.', className: 'term-dim' })
  }

  return lines
}
