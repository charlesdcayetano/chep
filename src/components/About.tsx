import { useState } from 'react'
import {
  SiLaravel,
  SiPhp,
  SiMysql,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVuedotjs,
  SiInertia,
  SiPostgresql,
  SiRedis,
  SiBootstrap,
  SiGit,
  SiGithub,
  SiVercel,
} from 'react-icons/si'
import { profile } from '../data/profile'
import MatrixText from './MatrixText'

// Project-specific tech stack matching Charles's portfolio projects
const projectTechIcons = [
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Inertia.js', icon: SiInertia, color: '#9553E9' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: 'currentColor' },
  { name: 'Vercel', icon: SiVercel, color: 'currentColor' },
]

export default function About() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  return (
    <section id="about" className="scroll-mt-28 border-border/50 border-b py-12 last:border-0">
      <div className="mb-6">
        <h2 className="text-foreground text-xl font-bold tracking-tight">About</h2>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {/* Charles's Portrait Card */}
        <div className="group overflow-hidden rounded-xl w-fit">
          <img
            alt={profile.name}
            loading="lazy"
            width={240}
            height={240}
            src="/images/Portfolio.webp"
            className="border-secondary size-48 sm:size-60 rounded-xl border-2 object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02] bg-zinc-100 dark:bg-zinc-900"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-foreground">
            <MatrixText text={profile.name} />
          </h3>

          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            BS Information Technology graduate and Full-Stack Developer based in Roxas City, Capiz, Philippines. I build practical, production-ready enterprise applications and digital business systems—most notably LinkCoop (cable internet billing and subscriber management) and Hulamverde (cooperative lending and ledger accounting) for PVDCI Coop. Passionate about crafting dependable full-stack architectures, automated billing engines, and robust web solutions that solve real-world problems.
          </p>

          <div className="flex flex-col gap-3 pt-1">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Project Technologies & Tools
            </span>
            <div className="flex flex-wrap gap-3.5 items-center">
              {projectTechIcons.map((tech) => {
                const IconComponent = tech.icon
                const isHovered = activeTooltip === tech.name

                return (
                  <div
                    key={tech.name}
                    className="relative"
                    onMouseEnter={() => setActiveTooltip(tech.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <div
                      className="size-6 transition-transform hover:scale-125 hover:cursor-pointer flex items-center justify-center text-muted-foreground hover:text-foreground"
                      aria-label={tech.name}
                    >
                      <IconComponent
                        className="size-5 sm:size-6 transition-colors"
                        style={{ color: tech.color !== 'currentColor' ? tech.color : undefined }}
                      />
                    </div>

                    {/* Interactive Tooltip matching kroszborg */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-[11px] font-medium rounded shadow-lg pointer-events-none whitespace-nowrap z-30 border border-zinc-700/50 animate-in fade-in zoom-in-95 duration-150">
                        {tech.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-800" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}