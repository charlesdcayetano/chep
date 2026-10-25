import {
  MapPin,
  GraduationCap,
  ShieldCheck,
  Briefcase,
  Terminal,
  HeartHandshake,
  Check,
  ArrowRight,
} from 'lucide-react'
import { profile } from '../data/profile'
import { currentJob } from '../data/currentJob'
import { useUi } from '../i18n/useUi'

export default function About() {
  const { t } = useUi()
  return (
    <section id="about" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display">
            About
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Background, engineering approach, and what I care about building
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">Profile</span>
      </div>

      {/* Main Narrative Card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Story Prose */}
        <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
          <p>
            I&apos;m a software developer based in <strong className="text-foreground font-semibold">Roxas City, Capiz</strong>, currently working as an IT Assistant at <strong className="text-foreground font-semibold">PVDCI Coop</strong>. My day-to-day involves designing, maintaining, and supporting internal systems that real staff rely on—from monthly internet subscriber billing in <a href="#projects" className="text-foreground font-medium underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-foreground">LinkCoop</a> to member loan computations in <a href="#projects" className="text-foreground font-medium underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-foreground">Hulamverde</a>, and modem IP network management.
          </p>

          <p>
            Coming from an IT background rather than just pure theoretical software, I spent years working closely with computers, local networks, and hardware. That practical experience shaped how I write code: I prioritize <span className="text-foreground font-medium">clean relational database schemas</span>, <span className="text-foreground font-medium">predictable business logic</span>, and <span className="text-foreground font-medium">interfaces that non-technical users can navigate without confusion</span>.
          </p>

          <p>
            My main stack centers around <strong className="text-foreground font-semibold">Laravel, PHP, and MySQL</strong> on the backend, paired with <strong className="text-foreground font-semibold">React, Vue 3, Inertia.js, and Tailwind CSS</strong> on the client side. I enjoy taking complex, paper-heavy operations and turning them into streamlined, automated web applications that just work.
          </p>
        </div>

        {/* Clean At-a-Glance Grid */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
            <Briefcase size={16} className="text-zinc-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
                Current Work
              </span>
              <span className="font-medium text-foreground">
                {t(currentJob.role)} at {currentJob.org}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
            <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
                Certification
              </span>
              <span className="font-medium text-foreground">
                DICT ICT Specialist (Civil Service CSC Eligible)
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
            <GraduationCap size={16} className="text-zinc-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
                Education
              </span>
              <span className="font-medium text-foreground">
                BS Information Technology, College of Information Tech
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
            <MapPin size={16} className="text-zinc-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
                Location & Status
              </span>
              <span className="font-medium text-foreground">
                Roxas City, Philippines • Open to Roles
              </span>
            </div>
          </div>
        </div>

        {/* Engineering Principles (Natural, non-corporate) */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold">
            How I Approach Projects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20 space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Check size={13} className="text-emerald-500" />
                <span>Simplicity First</span>
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                I favor clean, readable code and normalized schemas over unnecessary architectural complexity.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20 space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Check size={13} className="text-emerald-500" />
                <span>Built for Real Users</span>
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                Clear validation, sensible defaults, and error prevention so staff can do their work without friction.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20 space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Check size={13} className="text-emerald-500" />
                <span>Full Accountability</span>
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                From database migrations to UI polish and server deployments, I care about the end-to-end outcome.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}