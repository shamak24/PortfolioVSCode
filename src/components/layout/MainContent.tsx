import { ScrollProgress } from '@/components/background/ScrollProgress'
import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { portfolio } from '@/data'

export function MainContent() {
  return (
    <main className="app-main">
      <ScrollProgress />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer className="app-footer">
        // {portfolio.profile.footer} {new Date().getFullYear()}
      </footer>
    </main>
  )
}
