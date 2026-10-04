import { useEffect } from 'react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { useUi } from './i18n/useUi'
import Nav from './components/Nav'
import ProfileHeader from './components/ProfileHeader'
import About from './components/About'
import GithubActivity from './components/GithubActivity'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

/** Keeps <html lang> in sync with the selected language (screen readers, SEO, hyphenation). */
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
      className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-[#171717] focus:px-3 focus:py-2 focus:text-sm focus:text-[#FAFAFA] dark:focus:bg-[#F5F5F5] dark:focus:text-[#111111]"
    >
      {ui.skipToContent}
    </a>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <DocumentLang />
      <SkipLink />
      <div className="min-h-screen">
        <main id="main" className="mx-auto max-w-content px-5 sm:px-6">
          <Nav />
          <ProfileHeader />
          <About />
          <Skills />
          <GithubActivity />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  )
}