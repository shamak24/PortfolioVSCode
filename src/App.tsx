import { portfolio } from '@/data'
import { motion } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { UIStateProvider, useUIState } from '@/context/UIStateContext'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BackgroundLayers } from '@/components/background/BackgroundLayers'
import { Gutter } from '@/components/layout/Gutter'
import { TabBar } from '@/components/layout/TabBar'
import { StatusBar } from '@/components/layout/StatusBar'
import { MainContent } from '@/components/layout/MainContent'
import { CommandPalette } from '@/components/command-palette/CommandPalette'
import { Terminal } from '@/components/terminal/Terminal'
import { Minimap } from '@/components/minimap/Minimap'
import { ResumeModal } from '@/components/resume/ResumeModal'
import { PortfolioBootScreen } from '@/components/loading/PortfolioBootScreen'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'

function Toast() {
  const { toast } = useUIState()
  return (
    <div
      className={cn(
        'fixed bottom-11 left-1/2 z-[110] -translate-x-1/2 rounded-md border border-line bg-panel-2 px-4 py-2 font-mono text-[12.5px] text-text-bright transition-[opacity,transform] duration-200 max-sm:bottom-[44px]',
        toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2.5 opacity-0',
      )}
    >
      {toast}
    </div>
  )
}

function AppShell() {
  const { bootComplete } = useUIState()
  const reducedMotion = useReducedMotion()
  const sectionIds = portfolio.sections.map((s) => s.id)
  const activeSection = useScrollSpy(sectionIds, 'home')

  return (
    <>
      {!bootComplete && <PortfolioBootScreen />}
      {bootComplete && (
        <motion.div
          className="portfolio-app"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <BackgroundLayers />
          <Gutter />
          <TabBar activeSection={activeSection} />
          <MainContent />
          <Minimap />
          <StatusBar />
          <Terminal />
          <CommandPalette />
          <ResumeModal />
          <Toast />
        </motion.div>
      )}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UIStateProvider>
          <AppShell />
          <Analytics />
        </UIStateProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
