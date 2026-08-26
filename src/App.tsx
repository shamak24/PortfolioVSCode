import { portfolio } from '@/data'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { UIStateProvider, useUIState } from '@/context/UIStateContext'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { BackgroundLayers } from '@/components/background/BackgroundLayers'
import { Gutter } from '@/components/layout/Gutter'
import { TabBar } from '@/components/layout/TabBar'
import { StatusBar } from '@/components/layout/StatusBar'
import { MainContent } from '@/components/layout/MainContent'
import { CommandPalette } from '@/components/command-palette/CommandPalette'
import { Terminal } from '@/components/terminal/Terminal'
import { Minimap } from '@/components/minimap/Minimap'
import { ResumeModal } from '@/components/resume/ResumeModal'
import { cn } from '@/lib/utils'

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
  const sectionIds = portfolio.sections.map((s) => s.id)
  const activeSection = useScrollSpy(sectionIds, 'home')

  return (
    <>
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
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UIStateProvider>
          <AppShell />
        </UIStateProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
