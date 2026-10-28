import {
  Briefcase,
  Terminal,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { language } = useLanguage()
  const isFil = language === 'fil'

  return (
    <section id="about" className="scroll-mt-28 space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
            {isFil ? 'Tungkol sa Akin' : 'About'}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {isFil
              ? 'Background, pangunahing pokus, at diskarte sa pag-develop'
              : 'Background, core focus, and engineering approach'}
          </p>
        </div>
        <span className="text-xs font-mono text-muted-foreground">03 // Bio</span>
      </div>

      {/* Main shadcn Card */}
      <div className="rounded-xl border border-border bg-card text-card-foreground p-6 sm:p-7 shadow-xs space-y-6">
        {/* Concise Narrative */}
        <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
          {isFil ? (
            <>
              <p>
                Isa akong full-stack developer sa <span className="text-foreground font-medium">Roxas City, Capiz</span>, at kasalukuyang IT Assistant sa <span className="text-foreground font-medium">PVDCI Coop</span>. Gumagawa at nagpapanatili ako ng mga internal platform na ginagamit ng mga kawani araw-araw—mula sa automated subscriber billing sa <a href="#projects" className="text-foreground font-medium underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors">LinkCoop</a>, member loan processing sa <a href="#projects" className="text-foreground font-medium underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors">Hulamverde</a>, hanggang sa NOC network monitoring.
              </p>
              <p>
                Dahil nagmula ako sa hands-on IT support at hardware networking, praktikal ang aking lapit sa software: inuuna ang <span className="text-foreground font-medium">malinis na database schema</span>, <span className="text-foreground font-medium">maaasahang business logic</span>, at simpleng interface na magagamit ng non-technical staff nang walang kalituhan.
              </p>
            </>
          ) : (
            <>
              <p>
                I&apos;m a full-stack developer based in <span className="text-foreground font-medium">Roxas City, Capiz</span>, currently working as an IT Assistant at <span className="text-foreground font-medium">PVDCI Coop</span>. I design, maintain, and support internal web platforms that staff rely on daily—from ISP subscriber billing in <a href="#projects" className="text-foreground font-medium underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors">LinkCoop</a> to member loan management in <a href="#projects" className="text-foreground font-medium underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors">Hulamverde</a> and NOC network tracking.
              </p>
              <p>
                With a background in hands-on IT support and local networking rather than just theoretical code, I build software around operational realities: <span className="text-foreground font-medium">clean relational schemas</span>, <span className="text-foreground font-medium">predictable business logic</span>, and interfaces non-technical teams can navigate without training.
              </p>
            </>
          )}
        </div>

        {/* At-a-Glance High-Signal Specs Grid */}
        <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Briefcase size={13} className="shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {isFil ? 'Kasalukuyang Pokus' : 'Current Focus'}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {isFil ? 'Internal Business Systems' : 'Internal Business Systems'}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isFil
                ? 'Automated billing, loan processing at NOC tools sa PVDCI Coop'
                : 'Automated billing, loan accounting & NOC tools at PVDCI Coop'}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Terminal size={13} className="shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {isFil ? 'Pangunahing Stack' : 'Primary Stack'}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              Laravel · React · MySQL
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isFil
                ? 'Kasama ang Vue 3, Inertia.js, TypeScript at Tailwind CSS'
                : 'Paired with Vue 3, Inertia.js, TypeScript & Tailwind CSS'}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck size={13} className="shrink-0 text-emerald-500" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {isFil ? 'Kredensyal' : 'Credentials'}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              BSIT · DICT Part 1 Examination Passer
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isFil
                ? 'Nag-OJT sa DBTC na may 486-oras na Python training'
                : 'OJT at DBTC with 486-hour Python training'}
            </p>
          </div>
        </div>

        {/* Minimalist Principles Badges */}
        <div className="pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {isFil ? 'Mga Prinsipyo' : 'Engineering Focus'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-mono text-foreground">
              <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
              <span>{isFil ? 'Normalized SQL Schemas' : 'Normalized SQL Schemas'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-mono text-foreground">
              <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
              <span>{isFil ? 'Deterministic Logic' : 'Deterministic Logic'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-mono text-foreground">
              <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
              <span>{isFil ? 'Staff-First Usability' : 'Staff-First Usability'}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}