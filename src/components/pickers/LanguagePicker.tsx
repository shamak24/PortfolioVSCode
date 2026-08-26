import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

export function LanguagePicker() {
  const { language, languages, setLanguageId } = useLanguage()

  return (
    <div className="lang-picker">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" title="Language mode" className="lang-btn">
            <span className="chip" style={{ background: language.color }} />
            <span className="picker-label">{language.label}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="end" sideOffset={8} className="picker-menu">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.id}
              onSelect={() => setLanguageId(lang.id)}
              className={cn(lang.id === language.id && 'text-amber [&_.ext]:text-amber')}
            >
              <span>{lang.label}</span>
              <span className="ext text-[11px] text-text-dim">.{lang.ext}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
