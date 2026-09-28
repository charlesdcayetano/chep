import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  return (
    <nav
      aria-label="Main"
      className="flex items-center justify-between py-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]"
    >
      <span className="text-sm font-semibold tracking-tight">Portfolio</span>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  )
}