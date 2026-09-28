import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Language = 'en' | 'fil'

const STORAGE_KEY = 'language'

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'fil' ? 'fil' : 'en'
  } catch {
    // localStorage can throw in privacy modes / disabled storage — fall back quietly.
    return 'en'
  }
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

/**
 * Wrap your app (or at least the parts that show translated text — Nav,
 * ProfileHeader, About) in this once, near the root:
 *
 *   <LanguageProvider>
 *     <Nav />
 *     <ProfileHeader />
 *     <About />
 *   </LanguageProvider>
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    setLanguageState(getStoredLanguage())
  }, [])

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Storage unavailable — the toggle still works for this session via React state.
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used inside a <LanguageProvider>')
  }
  return ctx
}