import { useEffect, useState } from 'react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { useUi } from './i18n/useUi'
import Nav from './components/Nav'
import CommandPalette from './components/CommandPalette'
import ProfileHeader from './components/ProfileHeader'
import Experience from './components/Experience'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import GithubActivity from './components/GithubActivity'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { animatePageEntrance } from './utils/animeEffects'

function DocumentLang() {
  const { language } = useLanguage()
  useEffect(() => {
    document.documentElement.lang = language === 'fil' ? 'fil' : 'en'
  }, [language])
  return null
}

function SkipLink() {
  const { ui } = useUi()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background shadow-lg"
    >
      {ui.skipToContent}
    </a>
  )
}

function PortfolioContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Staggered page entrance animation via Anime.js
  useEffect(() => {
    animatePageEntrance('#main')
  }, [])

  // Global Ctrl+K / Cmd+K handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div id="top" className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background transition-colors duration-200">
      {/* Morphing Floating Pill Navbar */}
      <Nav onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Global Command Search Palette */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* 2-Column Kroszborg Layout */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">
          {/* Left Column: Sticky Profile Sidebar */}
          <ProfileHeader />

          {/* Right Column: Wide Content Stream */}
          <main id="main" className="min-w-0 flex-1 space-y-16">
            <Experience />
            <Projects />
            <About />
            <Skills />
            <GithubActivity />
            <Education />
            <Certifications />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <DocumentLang />
      <SkipLink />
      <PortfolioContent />
    </LanguageProvider>
  )
}