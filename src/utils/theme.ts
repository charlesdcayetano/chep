export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'cdc-theme'

export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

export function applyTheme(theme: Theme) {
  const systemDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = theme === 'dark' || (theme === 'system' && systemDark)
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', isDark ? '#000000' : '#ffffff')
    }
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme, isDark } }))
  }
}

export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
}

