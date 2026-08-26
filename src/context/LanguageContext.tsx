import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { portfolio } from '@/data'
import type { Language } from '@/types/portfolio'
import { useLocalStorageString } from '@/hooks/useLocalStorage'

interface LanguageContextValue {
  language: Language
  languages: Language[]
  setLanguageId: (id: string) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const languages = portfolio.languages
  const [languageId, setLanguageId] = useLocalStorageString('portfolio-lang', languages[0].id)

  const language = languages.find((l) => l.id === languageId) ?? languages[0]

  useEffect(() => {
    document.documentElement.style.setProperty('--comment-token', `"${language.comment}"`)
  }, [language])

  return (
    <LanguageContext.Provider
      value={{
        language,
        languages,
        setLanguageId,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
