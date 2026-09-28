import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/LanguageContext'

const options: { value: Language; label: string; fullLabel: string }[] = [
  { value: 'en', label: 'EN', fullLabel: 'English' },
  { value: 'fil', label: 'FIL', fullLabel: 'Filipino' },
]

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-1 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] p-0.5"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-label={opt.fullLabel}
          aria-pressed={language === opt.value}
          onClick={() => setLanguage(opt.value)}
          className={`px-2 py-1 rounded text-[11px] font-mono font-semibold transition-colors duration-150 ${
            language === opt.value
              ? 'bg-[#171717] text-[#FAFAFA] dark:bg-[#F5F5F5] dark:text-[#111111]'
              : 'text-[#666666] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#F5F5F5]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}