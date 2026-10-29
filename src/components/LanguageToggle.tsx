import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/LanguageContext'
import { useUi } from '../i18n/useUi'
import { playPop } from '../utils/sound'

const options: { value: Language; label: string; fullLabel: string }[] = [
  { value: 'en', label: 'EN', fullLabel: 'EN — English' },
  { value: 'fil', label: 'FIL', fullLabel: 'FIL — Filipino' },
]

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const { ui } = useUi()

  return (
    <div
      role="group"
      aria-label={ui.languageLabel}
      className="inline-flex h-8 sm:h-8.5 items-center gap-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-900/60 p-0.5 btn-inner-shadow"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-label={opt.fullLabel}
          aria-pressed={language === opt.value}
          onClick={() => {
            playPop()
            setLanguage(opt.value)
          }}
          className={`h-full rounded px-2 font-mono text-xs font-semibold transition-all duration-150 ${
            language === opt.value
              ? 'bg-foreground text-background shadow-xs'
              : 'text-zinc-500 hover:text-foreground dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}