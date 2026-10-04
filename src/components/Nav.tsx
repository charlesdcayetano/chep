import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import { profile } from '../data/profile'
import { useUi } from '../i18n/useUi'

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

export default function Nav() {
  const { ui } = useUi()

  return (
    <nav
      aria-label={ui.navLabel}
      className="sticky top-0 z-30 -mx-5 flex items-center justify-between gap-3 border-b rule bg-[#FAFAFA]/85 px-5 py-3 backdrop-blur dark:bg-[#111111]/85 sm:-mx-6 sm:px-6"
    >
      <a href="#top" className="flex min-w-0 items-center gap-2.5">
        <span
          aria-hidden="true"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#171717] text-[11px] font-bold tracking-tight text-[#FAFAFA] dark:bg-[#F5F5F5] dark:text-[#111111]"
        >
          {initials(profile.name)}
        </span>
        <span className="truncate text-sm font-semibold tracking-tight">{ui.brand}</span>
      </a>
      <div className="flex shrink-0 items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  )
}