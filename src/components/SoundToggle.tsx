import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isSoundEnabled, setSoundEnabled, playToggle } from '../utils/sound'
import { useLanguage } from '../i18n/LanguageContext'

export default function SoundToggle() {
  const { language } = useLanguage()
  const [enabled, setEnabled] = useState(isSoundEnabled)
  const [isHovered, setIsHovered] = useState(false)

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

  const tooltipText = enabled
    ? language === 'fil'
      ? 'May Tunog (Pindutin para i-mute)'
      : 'Sound On (Click to mute)'
    : language === 'fil'
      ? 'Naka-mute ang Tunog (Pindutin para paganahin)'
      : 'Sound Muted (Click to turn on)'

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <div className="relative group">
        <button
          type="button"
          onClick={handleToggleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={tooltipText}
          aria-pressed={enabled}
          className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all duration-200 backdrop-blur-md shadow-md active:scale-95 ${
            enabled
              ? 'border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 shadow-zinc-200/50 dark:shadow-black/40'
              : 'border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/60 text-zinc-400 dark:text-zinc-500 hover:text-foreground'
          }`}
        >
          {enabled ? (
            <div className="relative flex items-center justify-center">
              <Volume2 size={17} className="transition-transform group-hover:scale-110" />
              {/* Subtle pulsing sound indicator dot */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
          ) : (
            <VolumeX size={17} className="transition-transform group-hover:scale-110 opacity-70" />
          )}
        </button>

        {/* Floating Tooltip Bubble */}
        <div
          className={`absolute left-0 bottom-full mb-2 pointer-events-none transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          <div className="whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-medium font-sans bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-md">
            {tooltipText}
          </div>
        </div>
      </div>
    </div>
  )
}

