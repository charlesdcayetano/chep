import { useRef } from 'react'
import { ArrowUpRight, Github, GitCommit } from 'lucide-react'
import { profile } from '../data/profile'
import { useUi } from '../i18n/useUi'

function githubUsername(url: string): string {
  const last = url.split('/').filter(Boolean).pop()
  return last && !last.includes('.') ? last : 'charlesdcayetano'
}

export default function GithubActivity() {
  const { ui } = useUi()
  const scroller = useRef<HTMLDivElement>(null)
  const username = githubUsername(profile.github)

  function showLatest() {
    const el = scroller.current
    if (el) el.scrollLeft = el.scrollWidth
  }

  return (
    <section id="github" className="scroll-mt-28 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display flex items-center gap-2">
          <Github size={18} />
          {ui.githubLabel}
        </h2>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
        >
          <span>@{username}</span>
          <ArrowUpRight size={11} />
        </a>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 sm:p-5 space-y-3">
        <div ref={scroller} className="overflow-x-auto rounded-xl bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800">
          <img
            src={`https://ghchart.rshah.org/000000/${username}`}
            alt={ui.githubChartAlt(profile.name)}
            width={722}
            height={112}
            loading="lazy"
            decoding="async"
            onLoad={showLatest}
            className="h-auto w-full min-w-[600px] grayscale dark:invert transition-opacity duration-300"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 pt-1">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
            <GitCommit size={13} className="text-emerald-500" />
            Continuous commits &amp; daily development
          </span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            {ui.viewGithub} →
          </a>
        </div>
      </div>
    </section>
  )
}