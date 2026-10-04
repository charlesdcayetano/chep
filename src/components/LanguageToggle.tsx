import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/LanguageContext'
import { useUi } from '../i18n/useUi'

const options: { value: Language; label: string; fullLabel: string }[] = [
  { value: 'en', label: 'EN', fullLabel: 'English' },
  { value: 'fil', label: 'FIL', fullLabel: 'Filipino' },
]

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const { ui } = useUi()

  return (
    <div
      role="group"
      aria-label={ui.languageLabel}
      className="inline-flex h-9 items-center gap-0.5 rounded-md border rule p-0.5"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-label={opt.fullLabel}
          aria-pressed={language === opt.value}
          onClick={() => setLanguage(opt.value)}
          className={`h-full rounded px-2.5 font-mono text-[11px] font-semibold transition-colors duration-150 ${
            language === opt.value
              ? 'bg-[#171717] text-[#FAFAFA] dark:bg-[#F5F5F5] dark:text-[#111111]'
              : 't-muted hover:text-[#171717] dark:hover:text-[#F5F5F5]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}