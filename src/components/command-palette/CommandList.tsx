import { motion, AnimatePresence } from 'framer-motion'
import type { CommandItem } from './commands'
import { cn } from '@/lib/utils'

interface CommandListProps {
  commands: CommandItem[]
  activeIndex: number
  onSelect: (index: number) => void
  onRun: (cmd: CommandItem) => void
}

export function CommandList({ commands, activeIndex, onSelect, onRun }: CommandListProps) {
  if (commands.length === 0) {
    return <div className="cmdk-empty">No matching commands</div>
  }

  return (
    <div className="cmdk-list">
      <AnimatePresence mode="popLayout">
        {commands.map((cmd, i) => (
          <motion.div
            key={cmd.id}
            layout
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12, delay: i * 0.02 }}
            className={cn('cmdk-item', i === activeIndex && 'active')}
            onMouseEnter={() => onSelect(i)}
            onClick={() => onRun(cmd)}
          >
            <span className="cmdk-icon">{cmd.icon}</span>
            <span className="cmdk-label">{cmd.label}</span>
            {cmd.checked && <span className="cmdk-check">●</span>}
            <span className="cmdk-cat">{cmd.category}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
