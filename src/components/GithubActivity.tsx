import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import { Section } from './Section'
import { useUi } from '../i18n/useUi'

/** "https://github.com/user" -> "user" */
function githubUsername(url: string): string {
  const last = url.split('/').filter(Boolean).pop()
  return last && !last.includes('.') ? last : 'charlesdcayetano'
}

export default function GithubActivity() {
  const { ui } = useUi()
  const scroller = useRef<HTMLDivElement>(null)
  const username = githubUsername(profile.github)

  // On phones the chart is wider than the screen; start at the right edge so the
  // most recent contributions are visible first.
  function showLatest() {
    const el = scroller.current
    if (el) el.scrollLeft = el.scrollWidth
  }

  return (
    <Section id="github" title={ui.githubLabel}>
      <div ref={scroller} className="surface overflow-x-auto rounded-lg border rule p-4">
        {/* Black chart, forced to greyscale. In dark mode it is inverted (black -> white), and
            it follows the theme toggle because it uses the same `dark:` variant as the rest of the page. */}
        <img
          src={`https://ghchart.rshah.org/000000/${username}`}
          alt={ui.githubChartAlt(profile.name)}
          width={722}
          height={112}
          loading="lazy"
          decoding="async"
          onLoad={showLatest}
          className="h-auto w-full min-w-[600px] grayscale dark:invert"
        />
      </div>

      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        className="link-arrow mt-4 inline-flex min-h-[44px] text-sm"
      >
        {ui.viewGithub}
        <ArrowUpRight size={12} aria-hidden="true" />
      </a>
    </Section>
  )
}