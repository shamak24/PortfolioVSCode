import { TERMINAL_HELP_ENTRIES } from '@/components/terminal/terminalCommands'

export interface HelpShortcut {
  keys: string[]
  description: string
}

export const HELP_SHORTCUTS: HelpShortcut[] = [
  { keys: ['Ctrl', 'K'], description: 'Open command palette (Go to anything)' },
  { keys: ['Ctrl', 'Shift', 'P'], description: 'Open command palette' },
  { keys: ['Ctrl', '`'], description: 'Toggle terminal' },
  { keys: ['Esc'], description: 'Close command palette, terminal, or dialogs' },
]

export const HELP_PALETTE_TIPS = [
  'Click ⌕ Go to anything in the status bar or use the keyboard shortcuts above.',
  'Type to filter commands by name or category.',
  'Use ↑ and ↓ to navigate, Enter to run the selected command, Esc to close.',
  'Jump to any section, switch theme or language, copy your email, scroll to top, or toggle the terminal.',
]

export const HELP_TERMINAL_TIPS = [
  'Click >_ Terminal in the status bar or press Ctrl + ` to open and close it.',
  'Type a command and press Enter to run it. Use ↑ and ↓ to browse command history.',
  'Run clear to wipe the screen, or exit / close to hide the terminal.',
]

export const HELP_TERMINAL_COMMANDS = TERMINAL_HELP_ENTRIES

export const HELP_MAC_NOTE = 'On macOS, use ⌘ Cmd instead of Ctrl.'
