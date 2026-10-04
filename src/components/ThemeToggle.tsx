import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { getStoredTheme, setTheme, type Theme } from '../utils/theme'
import { useUi } from '../i18n/useUi'

const DARK_QUERY = '(prefers-color-scheme: dark)'

export default function ThemeToggle() {
  const { ui } = useUi()
  const [theme, setThemeState] = useState<Theme>('system')
  // Tracks the OS preference so a stored 'system' value can be resolved to
  // what the page is actually showing (light or dark).
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border rule t-muted transition-colors duration-150 hover:text-[#171717] dark:hover:text-[#F5F5F5]"
    >
      {/* Shows the icon of the mode you will switch TO */}
      {isDark ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
    </button>
  )
}