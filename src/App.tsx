import { useEffect, useState, lazy, Suspense } from 'react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { useUi } from './i18n/useUi'
import Nav from './components/Nav'
import ProfileHeader from './components/ProfileHeader'
import Experience from './components/Experience'
import DeferredSection from './components/DeferredSection'

const Projects = lazy(() => import('./components/Projects'))
const About = lazy(() => import('./components/About'))
const GithubActivity = lazy(() => import('./components/GithubActivity'))
const Skills = lazy(() => import('./components/Skills'))
const Education = lazy(() => import('./components/Education'))
const Certifications = lazy(() => import('./components/Certifications'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const CommandPalette = lazy(() => import('./components/CommandPalette'))

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
    <div id="top" className="relative min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background transition-colors duration-200">
      {/* Sabine Sun dot-matrix background (strictly behind all content) */}
      <div className="sabine-bg" aria-hidden="true" />

      {/* Main interactive content layer (elevated above background) */}
      <div className="relative z-10">
        {/* Morphing Floating Pill Navbar */}
        <Nav onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Global Command Search Palette - Lazy loaded on demand */}
        {isSearchOpen && (
          <Suspense fallback={null}>
            <CommandPalette
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
          </Suspense>
        )}

        {/* 2-Column Kroszborg Layout */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">
            {/* Left Column: Sticky Profile Sidebar */}
            <ProfileHeader />

            {/* Right Column: Wide Content Stream */}
            <main id="main" className="min-w-0 flex-1 space-y-16">
              <Experience />
              <Suspense fallback={null}>
                <DeferredSection id="projects" minHeight="480px">
                  <Projects />
                </DeferredSection>
                <DeferredSection id="about" minHeight="240px">
                  <About />
                </DeferredSection>
                <DeferredSection id="github" minHeight="180px">
                  <GithubActivity />
                </DeferredSection>
                <DeferredSection id="skills" minHeight="360px">
                  <Skills />
                </DeferredSection>
                <DeferredSection id="education" minHeight="180px">
                  <Education />
                </DeferredSection>
                <DeferredSection id="certifications" minHeight="260px">
                  <Certifications />
                </DeferredSection>
                <DeferredSection id="contact" minHeight="260px">
                  <Contact />
                </DeferredSection>
                <DeferredSection id="footer" minHeight="100px">
                  <Footer />
                </DeferredSection>
              </Suspense>
            </main>
          </div>
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