import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

export function ThemePicker() {
  const { theme, themes, setThemeId } = useTheme()

  return (
    <div className="lang-picker">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" title="Color theme" className="lang-btn">
            <span className="theme-swatch">
              <span style={{ background: theme.colors.amber }} />
              <span style={{ background: theme.colors.purple }} />
              <span style={{ background: theme.colors.blue }} />
            </span>
            <span className="picker-label">{theme.label}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="end" sideOffset={8} className="picker-menu">
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.id}
              onSelect={() => setThemeId(t.id)}
              className={cn(t.id === theme.id && 'text-amber')}
            >
              <span>{t.label}</span>
              <span className="flex gap-[3px]">
                {[t.colors.bg, t.colors.amber, t.colors.purple, t.colors.blue].map((c, i) => (
                  <span
                    key={i}
                    className="h-[9px] w-[9px] rounded-full border border-white/10"
                    style={{ background: c }}
                  />
                ))}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
