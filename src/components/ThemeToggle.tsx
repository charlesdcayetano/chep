import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { getStoredTheme, setTheme, type Theme } from '../utils/theme'
import { useUi } from '../i18n/useUi'

const DARK_QUERY = '(prefers-color-scheme: dark)'

export default function ThemeToggle() {
  const { ui } = useUi()
  const [theme, setThemeState] = useState<Theme>('system')
  const [systemDark, setSystemDark] = useState(false)

  useEffect(() => {
    setThemeState(getStoredTheme())

    if (typeof window.matchMedia !== 'function') return

    const media = window.matchMedia(DARK_QUERY)
    setSystemDark(media.matches)

    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const isDark = theme === 'dark' || (theme === 'system' && systemDark)
  const next: Theme = isDark ? 'light' : 'dark'
  const label = isDark ? ui.switchToLight : ui.switchToDark

  function toggle() {
    setTheme(next)
    setThemeState(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-8 sm:h-8.5 w-8 sm:w-8.5 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-300 transition-colors duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground active:scale-95 btn-inner-shadow"
    >
      {isDark ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
    </button>
  )
}