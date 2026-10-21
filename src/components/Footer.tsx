import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'
import { useUi } from '../i18n/useUi'

export default function Footer() {
  const { ui } = useUi()
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 py-10 text-xs text-zinc-600 dark:text-zinc-400">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-semibold text-foreground text-sm font-display">
            {profile.name}
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">{profile.title}</p>
          <p className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
            {ui.footerLocation}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-foreground transition-all"
          >
            <span>Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 font-mono gap-2">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <p>Built with React &bull; TypeScript &bull; Tailwind CSS</p>
      </div>
    </footer>
  )
}