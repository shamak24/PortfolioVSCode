interface OutputEntry {
  id: number
  type: 'echo' | 'output' | 'boot'
  text?: string
  className?: string
}

interface TerminalOutputProps {
  entries: OutputEntry[]
}

export function TerminalOutput({ entries }: TerminalOutputProps) {
  return (
    <div className="app-terminal-output">
      {entries.map((entry) => {
        if (entry.type === 'echo') {
          return (
            <div key={entry.id} className="term-line-cmd">
              <span className="app-terminal-prompt">
                alex@portfolio<span className="term-path">~/portfolio</span>$
              </span>{' '}
              {entry.text}
            </div>
          )
        }

        if (entry.type === 'boot') {
          return (
            <div key={entry.id} className={entry.className ?? 'term-line-cmd'}>
              {entry.text}
            </div>
          )
        }

        return (
          <div key={entry.id} className={entry.className ?? ''}>
            {entry.text}
          </div>
        )
      })}
    </div>
  )
}
