import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { getStoredTheme, setTheme, type Theme } from '../utils/theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

export default function ThemeToggle() {
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
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

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
      className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#666666] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#F5F5F5] transition-colors duration-150"
    >
      {/* Shows the icon of the mode you will switch TO */}
      {isDark ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
    </button>
  )
}