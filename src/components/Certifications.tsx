import { useState } from 'react'
import { ChevronDown, BadgeCheck } from 'lucide-react'
import { Icon } from '@iconify/react'
import { certifications, type Certification } from '../data/certifications'
import { useUi } from '../i18n/useUi'
import { playClick, playHover } from '../utils/sound'

/* ---------- Seal (the one signature element) ---------- */

function Laurel() {
  return (
    <g fill="currentColor">
      <path
        d="M10.5 16.2C6.4 13.8 4.4 10.6 4.6 6.2C4.7 4.2 5.7 2.4 7.4 1.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="5.2" cy="12.8" rx="2.1" ry="1.05" transform="rotate(-35 5.2 12.8)" />
      <ellipse cx="4.1" cy="9.2" rx="2.1" ry="1.05" transform="rotate(-15 4.1 9.2)" />
      <ellipse cx="4.7" cy="5.5" rx="2" ry="1" transform="rotate(15 4.7 5.5)" />
      <ellipse cx="6.8" cy="2.5" rx="1.8" ry="0.95" transform="rotate(38 6.8 2.5)" />
    </g>
  )
}

function YearSeal({ year, sizeClass = 'size-14' }: { year: number | string; sizeClass?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      role="img"
      aria-label={String(year)}
      className={`${sizeClass} shrink-0 text-zinc-300 dark:text-zinc-700 motion-safe:transition-transform motion-safe:duration-300 group-hover:-rotate-6 group-hover:text-zinc-400 dark:group-hover:text-zinc-500`}
    >
      <circle cx="28" cy="28" r="26.5" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      <g transform="translate(9 17)">
        <Laurel />
      </g>
      <g transform="translate(47 17) scale(-1 1)">
        <Laurel />
      </g>
      <text
        x="28"
        y="32"
        textAnchor="middle"
        className="fill-zinc-800 dark:fill-zinc-100 font-display"
        style={{ fontSize: 11, fontWeight: 700, letterSpacing: '-0.02em' }}
      >
        {year}
      </text>
    </svg>
  )
}

function VerifiedTag({ isFil }: { isFil: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-600/30 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
      <BadgeCheck size={14} aria-hidden="true" />
      {isFil ? 'Beripikado' : 'Verified'}
    </span>
  )
}

const cardBase =
  'group relative flex h-full cursor-default select-none flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700'

/* ---------- Lead card: the strongest credential gets the most room ---------- */

function LeadCard({ cert, isFil }: { cert: Certification; isFil: boolean }) {
  return (
    <article
      aria-label={`${cert.name}, ${cert.issuer} (${cert.year})`}
      className={`${cardBase} shadow-xs lg:col-span-2 lg:row-span-2`}
    >
      {/* Certificate-paper grid, used only here so the lead card stands apart */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-40 [background-image:linear-gradient(to_right,rgb(161_161_170/0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgb(161_161_170/0.2)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />

      <div className="relative flex flex-1 flex-col justify-between gap-10 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <Icon icon={cert.icon} className="size-8 text-foreground" aria-hidden="true" />
          </div>
          <YearSeal year={cert.year} sizeClass="size-24" />
        </div>

        <div className="space-y-2">
          <h3 className="max-w-[24ch] font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-3xl">
            {cert.name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{cert.issuer}</p>
        </div>
      </div>

      <div className="relative border-t border-dashed border-zinc-300 px-6 py-4 dark:border-zinc-700 sm:px-8">
        <VerifiedTag isFil={isFil} />
      </div>
    </article>
  )
}

/* ---------- Supporting card ---------- */

function SupportCard({ cert, isFil }: { cert: Certification; isFil: boolean }) {
  return (
    <article aria-label={`${cert.name}, ${cert.issuer} (${cert.year})`} className={`${cardBase} shadow-2xs`}>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 motion-safe:transition-transform group-hover:scale-105">
            <Icon icon={cert.icon} className="size-5 text-foreground" aria-hidden="true" />
          </div>
          <span className="font-display text-sm font-bold tabular-nums text-zinc-500 dark:text-zinc-400">
            {cert.year}
          </span>
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-[15px] font-bold leading-snug tracking-tight text-foreground text-pretty">
            {cert.name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{cert.shortIssuer}</p>
        </div>
      </div>
      <div className="border-t border-dashed border-zinc-300 px-5 py-3 dark:border-zinc-700">
        <VerifiedTag isFil={isFil} />
      </div>
    </article>
  )
}

/* ---------- Compact row for everything else ---------- */

function CompactRow({ cert }: { cert: Certification }) {
  return (
    <li
      aria-label={`${cert.name}, ${cert.issuer} (${cert.year})`}
      className="flex cursor-default select-none items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <Icon icon={cert.icon} className="size-[18px] text-foreground" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-foreground">{cert.name}</p>
        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{cert.shortIssuer}</p>
      </div>
      <span className="shrink-0 text-xs tabular-nums text-zinc-500 dark:text-zinc-400">{cert.year}</span>
    </li>
  )
}

/* ---------- Section ---------- */

export default function Certifications() {
  const { ui, language } = useUi()
  const isFil = language === 'fil'
  const [showAll, setShowAll] = useState(false)

  const featured = certifications.filter((c) => c.featured)
  const others = certifications.filter((c) => !c.featured)
  const [lead, ...support] = featured

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="scroll-mt-28 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="space-y-1">
          <h2
            id="certifications-title"
            className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl"
          >
            {ui.certifications}
          </h2>
          <p className="max-w-prose text-sm text-zinc-500 dark:text-zinc-400">
            {isFil
              ? 'Opisyal na mga kredensyal sa ICT, software engineering, cybersecurity, at systems servicing'
              : 'Verified credentials in ICT proficiency, software engineering, cybersecurity & systems servicing'}
          </p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium tabular-nums text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {isFil ? `${certifications.length} kredensyal` : `${certifications.length} credentials`}
        </span>
      </header>

      {/* Bento: one lead credential spanning 2x2, supporting cards fill around it */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3">
        {lead && <LeadCard cert={lead} isFil={isFil} />}
        {support.map((cert) => (
          <SupportCard key={cert.id} cert={cert} isFil={isFil} />
        ))}
      </div>

      {/* The rest: a dense two-column list, revealed on request */}
      {others.length > 0 && (
        <>
          <div
            id="more-certifications"
            aria-hidden={!showAll}
            className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out ${
              showAll ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <ul className="grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-2">
                {others.map((cert) => (
                  <CompactRow key={cert.id} cert={cert} />
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="more-certifications"
            onMouseEnter={playHover}
            onClick={() => {
              playClick()
              setShowAll((prev) => !prev)
            }}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50/70 px-4 py-3 text-left text-sm font-medium text-zinc-600 shadow-2xs transition-colors hover:bg-zinc-100 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-white dark:focus-visible:outline-zinc-100"
          >
            <span>
              {showAll
                ? isFil
                  ? 'Ipakita lamang ang pangunahing sertipikasyon'
                  : 'Show featured only'
                : isFil
                  ? `Tingnan ang ${others.length} pang sertipikasyon (TESDA, SOC Defense & AMA)`
                  : `Show ${others.length} more (TESDA, SOC Defense & AMA)`}
            </span>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={`shrink-0 motion-safe:transition-transform motion-safe:duration-200 ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
        </>
      )}
    </section>
  )
}