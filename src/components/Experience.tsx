import { useState } from 'react'
import {
  ChevronDown,
  Calendar,
  MapPin,
} from 'lucide-react'
import {
  SiLaravel,
  SiPhp,
  SiMysql,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiVuedotjs,
  SiInertia,
  SiPython,
} from 'react-icons/si'
import { experience } from '../data/experience'
import { currentJob } from '../data/currentJob'
import { useUi } from '../i18n/useUi'

interface JobEntry {
  id: string
  role: string
  org: string
  period: string
  location?: string
  description: string[]
  technologies: { name: string; icon: React.ReactNode }[]
  current?: boolean
}

export default function Experience() {
  const { ui, t, language } = useUi()
  const isFil = language === 'fil'

  // Track expanded cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'pvdci-current': true, // Open by default
    'exp-0': true,
  })

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const entries: JobEntry[] = [
    {
      id: 'pvdci-current',
      role: t(currentJob.role),
      org: currentJob.org,
      period: isFil ? 'Nob 2025 — Kasalukuyan' : 'Nov 2025 — Present',
      location: 'Roxas City, Capiz, Philippines',
      description: currentJob.description.map((line) => t(line)),
      technologies: [
        { name: 'Laravel 11', icon: <SiLaravel className="text-[#FF2D20]" /> },
        { name: 'PHP 8.2', icon: <SiPhp className="text-[#777BB4]" /> },
        { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" /> },
      ],
      current: true,
    },
    ...experience
      .filter((item) => !/pvdci/i.test(String(item.org)))
      .map((item, idx) => ({
        id: `exp-${idx}`,
        role: t(item.role),
        org: t(item.org),
        period: t(item.period),
        location: item.location ? t(item.location) : 'Philippines',
        description: item.description.map((line) => t(line)),
        technologies:
          item.role.toLowerCase().includes('python')
            ? [
                { name: 'Python 3', icon: <SiPython className="text-[#3776AB]" /> },
                { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
              ]
            : [
                { name: 'React', icon: <SiReact className="text-[#61DAFB]" /> },
                { name: 'Vue 3', icon: <SiVuedotjs className="text-[#4FC08D]" /> },
                { name: 'Inertia.js', icon: <SiInertia className="text-[#9553E9]" /> },
                { name: 'Laravel', icon: <SiLaravel className="text-[#FF2D20]" /> },
                { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
              ],
      })),
  ]

  const monogram = (org: string) => {
    if (org.toLowerCase().includes('pvdci')) return 'PV'
    if (org.toLowerCase().includes('independent')) return 'IP'
    if (org.toLowerCase().includes('bailan')) return 'BH'
    if (org.toLowerCase().includes('digital business')) return 'DB'
    const words = org.split(/\s+/).filter(Boolean)
    return words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : org.slice(0, 2).toUpperCase()
  }

  return (
    <section id="experience" className="scroll-mt-28 space-y-6">
      {/* Section Title */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display">
            {ui.experience}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {isFil
              ? 'Praktikal na software development, cooperative engineering at pagpapanatili ng sistema'
              : 'Hands-on software development, cooperative engineering & systems maintenance'}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{isFil ? 'Yugto ng Karera • 2023 — Kasalukuyan' : 'Career Journey • 2023 — Present'}</span>
          </span>
        </div>
      </div>

      {/* Experience Cards List */}
      <div className="space-y-4">
        {entries.map((job) => {
          const isOpen = !!expandedIds[job.id]

          return (
            <div
              key={job.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                job.current
                  ? 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/80 shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              {/* Card Header Row */}
              <div
                onClick={() => toggleExpand(job.id)}
                className="cursor-pointer p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
              >
                {/* Left: Monogram / Logo + Role & Org */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display font-bold text-xs tracking-wider border shadow-xs ${
                      job.current
                        ? 'bg-foreground text-background border-transparent'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-foreground border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    {monogram(job.org)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground text-base tracking-tight truncate">
                        {job.role}
                      </h3>
                      {job.current && (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {isFil ? 'Aktibo' : 'Active'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5">
                      <span className="font-medium text-foreground/80">{job.org}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-zinc-400" />
                        {job.location}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right: Period & Chevron Toggle */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800/80">
                  <span className="flex items-center gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <Calendar size={12} className="text-zinc-400" />
                    {job.period}
                  </span>
                  <button
                    type="button"
                    aria-label={isOpen ? `Collapse details for ${job.role}` : `Expand details for ${job.role}`}
                    className={`flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-foreground transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-zinc-100 dark:bg-zinc-800 text-foreground' : ''
                    }`}
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* Expandable Details Container with Smooth CSS Grid Accordion */}
              <div
                className={`grid transition-all duration-300 ease-out overflow-hidden border-t border-zinc-100 dark:border-zinc-800 ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="min-h-0">
                  <div className="px-4 sm:px-5 pb-5 pt-3.5 space-y-4">
                    {/* Technologies & Tools Pills */}
                    {job.technologies.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                          {isFil ? 'Mga Teknolohiya at Sistema' : 'Technologies & Systems'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <span
                              key={tech.name}
                              className="skill-inner-shadow inline-flex items-center gap-1.5 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-100/70 dark:bg-zinc-800/60 px-2.5 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:border-zinc-400"
                            >
                              <span aria-hidden="true" className="text-sm shrink-0">{tech.icon}</span>
                              <span>{tech.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bullet points */}
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                        {isFil ? 'Pangunahing Kontribusyon at Saklaw' : 'Key Contributions & Scope'}
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {job.description.map((line, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 mt-2 shrink-0" />
                            <span className="min-w-0">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}