import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Github,
  ArrowUpRight,
} from 'lucide-react'
import {
  SiLaravel,
  SiPhp,
  SiMysql,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiInertia,
  SiRedis,
  SiLeaflet,
  SiTypescript,
  SiBootstrap,
  SiVercel,
} from 'react-icons/si'
import { projects, type Project } from '../data/projects'
import { useUi } from '../i18n/useUi'

const techIconMap: Record<string, React.ReactNode> = {
  Laravel: <SiLaravel className="text-[#FF2D20]" />,
  'Laravel 11': <SiLaravel className="text-[#FF2D20]" />,
  PHP: <SiPhp className="text-[#777BB4]" />,
  MySQL: <SiMysql className="text-[#4479A1]" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
  JavaScript: <SiJavascript className="text-[#F7DF1E]" />,
  React: <SiReact className="text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs />,
  'Vue 3': <SiVuedotjs className="text-[#4FC08D]" />,
  'Inertia.js': <SiInertia className="text-[#9553E9]" />,
  Redis: <SiRedis className="text-[#DC382D]" />,
  Leaflet: <SiLeaflet className="text-[#199900]" />,
  TypeScript: <SiTypescript className="text-[#3178C6]" />,
  Bootstrap: <SiBootstrap className="text-[#7952B3]" />,
  Vercel: <SiVercel />,
}

type CategoryFilter = 'All' | 'Systems & Billing' | 'SaaS & Web' | 'GovTech & Civic'

export default function Projects() {
  const { ui, t } = useUi()
  const [filter, setFilter] = useState<CategoryFilter>('All')

  const filterMatches = (p: Project) => {
    if (filter === 'All') return true
    if (filter === 'Systems & Billing') {
      return (
        p.category.includes('Billing') ||
        p.category.includes('Lending') ||
        p.category.includes('Booking')
      )
    }
    if (filter === 'SaaS & Web') {
      return (
        p.category.includes('SaaS') ||
        p.category.includes('Academic') ||
        p.category.includes('Healthcare')
      )
    }
    if (filter === 'GovTech & Civic') {
      return p.category.includes('Public') || p.category.includes('Transit')
    }
    return true
  }

  const filteredProjects = projects.filter(filterMatches)

  return (
    <section id="projects" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display">
            {ui.selectedWork}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Production cooperative portals, business systems, and web utilities
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-400 shrink-0">0{projects.length} Projects</span>
      </div>

      {/* Filter Pills: Single-row horizontal container */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 w-fit max-w-full overflow-x-auto">
        {(['All', 'Systems & Billing', 'SaaS & Web', 'GovTech & Civic'] as CategoryFilter[]).map(
          (cat) => {
            const isActive = filter === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`relative whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-background font-semibold'
                    : 'text-zinc-500 hover:text-foreground dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectCategoryFilter"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-lg bg-foreground shadow-xs -z-10"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            )
          }
        )}
      </div>

      {/* Projects Grid: Balanced 2-Column Responsive Layout */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              key={project.index}
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/70 p-5 sm:p-6 shadow-xs transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1 hover:shadow-lg"
            >
            <div>
              {/* Top Row: Index Badge & Status Indicator */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                <span className="font-mono text-xs text-zinc-400 font-semibold tracking-wider">
                  PROJECT {project.index}
                </span>

                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span>Operational</span>
                </div>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
                    {project.category}
                  </span>
                </div>
                {project.fullName && (
                  <p className="text-xs text-zinc-500 font-medium">{project.fullName}</p>
                )}
              </div>

              {/* Description without awkward truncation */}
              <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t(project.description)}
              </p>

              {/* Core Features: Complete, cleanly styled tags */}
              {project.focus && project.focus.length > 0 && (
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Key Deliverables
                  </p>
                  <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {project.focus.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-zinc-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Row: Tech Stack & Action Links */}
            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-3">
              {/* Tech stack badge items */}
              <div className="flex flex-wrap items-center gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="skill-inner-shadow inline-flex items-center gap-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900 px-2 py-0.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="text-xs">{techIconMap[tech] || '•'}</span>
                    <span>{tech}</span>
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[11px] text-zinc-400 font-mono">
                  {project.note ? 'PVDCI Coop' : 'Full-Stack'}
                </span>

                <div className="flex items-center gap-3">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.name}`}
                      className="flex items-center gap-1 font-medium text-zinc-600 dark:text-zinc-300 hover:text-foreground transition-colors"
                    >
                      <Github size={13} />
                      <span>Code</span>
                      <ArrowUpRight size={10} className="text-zinc-400" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live deployment for ${project.name}`}
                      className="flex items-center gap-1 font-medium text-foreground hover:underline transition-colors"
                    >
                      <ExternalLink size={13} />
                      <span>Live Site</span>
                      <ArrowUpRight size={10} className="text-zinc-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}