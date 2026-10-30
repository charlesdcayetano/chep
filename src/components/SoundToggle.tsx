import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isSoundEnabled, setSoundEnabled, playToggle, playHover } from '../utils/sound'
import { useLanguage } from '../i18n/LanguageContext'

interface SoundToggleProps {
  compact?: boolean
}

export default function SoundToggle({ compact = false }: SoundToggleProps) {
  const { language } = useLanguage()
  const [enabled, setEnabled] = useState(isSoundEnabled)

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const custom = e as CustomEvent<{ enabled: boolean }>
      if (typeof custom.detail?.enabled === 'boolean') {
        setEnabled(custom.detail.enabled)
      } else {
        setEnabled(isSoundEnabled())
      }
    }

    window.addEventListener('sound-toggle-change', handleToggle)
    window.addEventListener('storage', handleToggle)
    return () => {
      window.removeEventListener('sound-toggle-change', handleToggle)
      window.removeEventListener('storage', handleToggle)
    }
  }, [])

  const handleToggleClick = () => {
    const next = !enabled
    setEnabled(next)
    setSoundEnabled(next)
    if (!next) {
      playToggle(false)
    }
  }

  const label = enabled
    ? language === 'fil'
      ? 'Tunog: Bukas'
      : 'Sound: On'
    : language === 'fil'
      ? 'Tunog: Mute'
      : 'Sound: Off'

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleToggleClick}
        aria-label={label}
        aria-pressed={enabled}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all active:scale-95 ${
          enabled
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
            : 'border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-muted-foreground'
        }`}
      >
        {enabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
        <span>{enabled ? (language === 'fil' ? 'Bukas' : 'On') : 'Muted'}</span>
      </button>
    )
  }

  return (
    <div className="relative group shrink-0">
      <button
        type="button"
        onClick={handleToggleClick}
        onMouseEnter={playHover}
        aria-label={label}
        aria-pressed={enabled}
        className={`relative inline-flex h-8 sm:h-8.5 w-8 sm:w-8.5 items-center justify-center rounded-md border transition-colors duration-150 active:scale-95 btn-inner-shadow ${
          enabled
            ? 'border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground'
            : 'border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-900/60 text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground'
        }`}
      >
        {enabled ? (
          <>
            <Volume2 size={15} aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-emerald-500" />
          </>
        ) : (
          <VolumeX size={15} aria-hidden="true" />
        )}
      </button>

      {/* Micro floating tooltip matching navbar app icons */}
      <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 transform group-hover:translate-y-0 translate-y-1 z-50">
        <div className="relative px-2 py-0.5 rounded-md text-[10px] font-mono tracking-tight whitespace-nowrap bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-md">
          {label}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-b-4 border-b-zinc-900 dark:border-b-zinc-100" />
        </div>
      </div>
    </div>
  )
}
