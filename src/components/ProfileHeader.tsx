import {
  Send,
  MapPin,
  Briefcase,
} from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiMysql,
  SiPostgresql,
} from 'react-icons/si'
import { profile } from '../data/profile'
import { currentJob } from '../data/currentJob'
import { useUi } from '../i18n/useUi'
import EyeTrackingButton from './EyeTrackingButton'
import MatrixText from './MatrixText'

export default function ProfileHeader() {
  const { t } = useUi()

  return (
    <aside className="w-full lg:w-64 xl:w-72 lg:shrink-0">
      <div className="lg:sticky lg:top-28 space-y-5">
        {/* Steady Profile Avatar & Status Badge */}
        <div className="flex items-center justify-between lg:flex-col lg:items-start gap-4">
          <div className="relative group">
            <div className="size-20 sm:size-24 rounded-full overflow-hidden ring-2 ring-zinc-300 dark:ring-zinc-700/80 shadow-md bg-zinc-100 dark:bg-zinc-900">
              <img
                src="/images/Portfolio.webp"
                alt={`${profile.name} portrait`}
                width={96}
                height={96}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover transition-opacity duration-200"
              />
            </div>
          </div>

          {/* Availability Status Badge */}
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-radar rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Available for Hire</span>
          </div>
        </div>

        {/* Name and Title with Interactive Matrix Scramble on Hover */}
        <div className="space-y-1">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-[2.6rem] font-bold tracking-[-0.03em] text-foreground leading-[1.08]">
            <MatrixText text={profile.name} />
          </h1>
          <p className="text-base font-medium text-zinc-600 dark:text-zinc-400 tracking-tight">
            <MatrixText text={profile.title} />{' '}
            <span className="font-mono text-xs font-normal">(@{profile.handle})</span>
          </p>
        </div>

        {/* Aligned Current Role & Location Metadata Cards */}
        <div className="space-y-2 pt-1 border-y border-zinc-200/80 dark:border-zinc-800/80 py-3">
          <div className="flex items-start gap-2.5 text-xs">
            <Briefcase size={14} className="text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
                Current Role
              </span>
              <span className="font-semibold text-foreground text-xs leading-tight">
                {t(currentJob.role)} @{currentJob.org}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs">
            <MapPin size={14} className="text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
                Location
              </span>
              <span className="font-medium text-foreground text-xs">
                {profile.location}
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Bio with Inline Tech Badges (Icon + Name) Requested by User */}
        <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
            <span>I build production-ready applications using </span>
            <a
              href="https://laravel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-0.5 text-xs sm:text-sm font-bold text-foreground dark:border-white/30 dark:bg-white/15 dark:text-white transition-transform hover:scale-105"
            >
              <span aria-hidden="true" className="size-3.5 sm:size-4 flex-shrink-0 flex items-center justify-center text-[#FF2D20]">
                <SiLaravel className="size-full" />
              </span>
              <span className="ml-1 text-xs sm:text-sm font-bold">Laravel</span>
            </a>
            <span>, </span>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-0.5 text-xs sm:text-sm font-bold text-foreground dark:border-white/30 dark:bg-white/15 dark:text-white transition-transform hover:scale-105"
            >
              <span aria-hidden="true" className="size-3.5 sm:size-4 flex-shrink-0 flex items-center justify-center text-[#61DAFB]">
                <SiReact className="size-full" />
              </span>
              <span className="ml-1 text-xs sm:text-sm font-bold">React</span>
            </a>
            <span>, </span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-0.5 text-xs sm:text-sm font-bold text-foreground dark:border-white/30 dark:bg-white/15 dark:text-white transition-transform hover:scale-105"
            >
              <span aria-hidden="true" className="size-3.5 sm:size-4 flex-shrink-0 flex items-center justify-center">
                <SiNextdotjs className="size-full" />
              </span>
              <span className="ml-1 text-xs sm:text-sm font-bold">Next.js</span>
            </a>
            <span>, </span>
            <a
              href="https://www.typescriptlang.org"
              target="_blank"
              rel="noopener noreferrer"
              className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-0.5 text-xs sm:text-sm font-bold text-foreground dark:border-white/30 dark:bg-white/15 dark:text-white transition-transform hover:scale-105"
            >
              <span aria-hidden="true" className="size-3.5 sm:size-4 flex-shrink-0 flex items-center justify-center text-[#3178C6]">
                <SiTypescript className="size-full" />
              </span>
              <span className="ml-1 text-xs sm:text-sm font-bold">TypeScript</span>
            </a>
            <span>, </span>
            <a
              href="https://www.mysql.com"
              target="_blank"
              rel="noopener noreferrer"
              className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-0.5 text-xs sm:text-sm font-bold text-foreground dark:border-white/30 dark:bg-white/15 dark:text-white transition-transform hover:scale-105"
            >
              <span aria-hidden="true" className="size-3.5 sm:size-4 flex-shrink-0 flex items-center justify-center text-[#4479A1]">
                <SiMysql className="size-full" />
              </span>
              <span className="ml-1 text-xs sm:text-sm font-bold">MySQL</span>
            </a>
            <span> and </span>
            <a
              href="https://www.postgresql.org"
              target="_blank"
              rel="noopener noreferrer"
              className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-0.5 text-xs sm:text-sm font-bold text-foreground dark:border-white/30 dark:bg-white/15 dark:text-white transition-transform hover:scale-105"
            >
              <span aria-hidden="true" className="size-3.5 sm:size-4 flex-shrink-0 flex items-center justify-center text-[#4169E1]">
                <SiPostgresql className="size-full" />
              </span>
              <span className="ml-1 text-xs sm:text-sm font-bold">PostgreSQL</span>
            </a>
            <span>. Specialized in core cooperative platforms, automated billing engines, and practical full-stack software.</span>
          </span>
        </p>

        {/* Action Buttons: Resume with Eye Tracking + Get In Touch */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <EyeTrackingButton resumeUrl="#contact" />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-95 shadow-sm"
          >
            <Send size={13} />
            <span>Get in touch</span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2 pt-1 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            aria-label="GitHub Profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-foreground transition-all duration-150"
          >
            <FaGithub aria-hidden="true" size={14} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-foreground transition-all duration-150"
          >
            <FaLinkedin aria-hidden="true" size={14} />
          </a>
          <a
            href={profile.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook Profile"
            aria-label="Facebook Profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-foreground transition-all duration-150"
          >
            <FaFacebook aria-hidden="true" size={14} />
          </a>
          <a
            href={profile.x}
            target="_blank"
            rel="noopener noreferrer"
            title="X (Twitter) Profile"
            aria-label="X (Twitter) Profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-foreground transition-all duration-150"
          >
            <FaXTwitter aria-hidden="true" size={14} />
          </a>
        </div>
      </div>
    </aside>
  )
}