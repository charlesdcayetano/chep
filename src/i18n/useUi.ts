import { useLanguage } from './LanguageContext'
import { uiStrings, tr, type Localized } from './ui'

/** One hook for every component: current language, UI strings, and a data translator. */
export function useUi() {
  const { language } = useLanguage()
  return {
    language,
    ui: uiStrings[language],
    /** Translate a data value (plain string or { en, fil }). */
    t: (value: Localized) => tr(value, language),
  }
}