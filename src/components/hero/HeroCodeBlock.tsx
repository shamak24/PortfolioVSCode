import { useLanguage } from '@/context/LanguageContext'
import { portfolio } from '@/data'
import { generateHeroCode, type CodeToken } from '@/utils/heroCode'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

function Token({ token }: { token: CodeToken }) {
  const classMap: Record<CodeToken['type'], string> = {
    kw: 'code-kw',
    fn: 'code-fn',
    str: 'code-str',
    prop: 'code-prop',
    amber: 'code-amber',
    com: 'code-com',
  }
  return <span className={classMap[token.type]}>{token.text}</span>
}

export function HeroCodeBlock() {
  const { language } = useLanguage()
  const reducedMotion = useReducedMotion()
  const lines = generateHeroCode(portfolio.profile, language.id)

  return (
    <div className="code-block">
      {lines.map((line, i) => (
        <div
          key={`${language.id}-${i}`}
          className={cn(!reducedMotion && 'code-line-animate')}
          style={!reducedMotion ? { animationDelay: `${i * 65}ms` } : undefined}
        >
          {line.tokens.map((token, j) => (
            <Token key={j} token={token} />
          ))}
          {i === lines.length - 1 && <span className="code-cursor" />}
        </div>
      ))}
    </div>
  )
}
