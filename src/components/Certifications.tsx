import { useState } from 'react'
import { ChevronDown, Award } from 'lucide-react'
import { Icon } from '@iconify/react'
import { certifications, type Certification } from '../data/certifications'
import { useUi } from '../i18n/useUi'
import { playClick, playHover } from '../utils/sound'

function LaurelBranch({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      aria-hidden="true"
      className={`text-zinc-300 dark:text-zinc-600 shrink-0 ${flip ? ' -scale-x-100' : ''}`}
    >
      <path
        d="M10.5 16.2C6.4 13.8 4.4 10.6 4.6 6.2C4.7 4.2 5.7 2.4 7.4 1.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse cx="5.2" cy="12.8" rx="2.1" ry="1.05" transform="rotate(-35 5.2 12.8)" fill="currentColor" />
      <ellipse cx="4.1" cy="9.2" rx="2.1" ry="1.05" transform="rotate(-15 4.1 9.2)" fill="currentColor" />
      <ellipse cx="4.7" cy="5.5" rx="2.0" ry="1.0" transform="rotate(15 4.7 5.5)" fill="currentColor" />
      <ellipse cx="6.8" cy="2.5" rx="1.8" ry="0.95" transform="rotate(38 6.8 2.5)" fill="currentColor" />
    </svg>
  )
}

function CertificationCard({ cert, isFil }: { cert: Certification; isFil: boolean }) {
  return (
    <div
      aria-label={`${cert.name} — ${cert.issuer} (${cert.year})`}
      className="group rounded-2xl bg-zinc-100/75 dark:bg-zinc-900/50 p-1.5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs transition-colors duration-200 hover:border-zinc-300 dark:hover:border-zinc-700 select-none cursor-default"
    >
      <div className="h-full rounded-[13px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-5 py-6 flex flex-col items-center justify-between text-center gap-4">
        {/* Centered Issuer / Tech Emblem */}
        <div className="flex size-11 items-center justify-center rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs transition-transform duration-200 group-hover:scale-105">
          <Icon icon={cert.icon} className="size-5 text-foreground" />
        </div>

        {/* Centered Credential Title & Uppercase Monospace Issuer */}
        <div className="space-y-1.5">
          <h3 className="text-[14px] sm:text-[15px] font-bold tracking-tight text-foreground font-display leading-snug">
            {cert.name}
          </h3>
          <p className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
            {cert.shortIssuer}
          </p>
        </div>

        {/* Non-Clickable Laurel Wreath Verification Seal */}
        <div className="inline-flex items-center gap-1.5 pt-0.5">
          <LaurelBranch />
          <span className="text-[10px] font-mono font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
            {isFil ? `VERIFIED · ${cert.year}` : `VERIFIED · ${cert.year}`}
          </span>
          <LaurelBranch flip />
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const { ui, language } = useUi()
  const isFil = language === 'fil'
  const [showAll, setShowAll] = useState(false)

  const featuredCerts = certifications.filter((c) => c.featured)
  const otherCerts = certifications.filter((c) => !c.featured)
  const visibleCerts = showAll ? certifications : featuredCerts

  return (
    <section id="certifications" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display">
            {ui.certifications}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {isFil
              ? 'Opisyal na mga kredensyal sa ICT, software engineering, cybersecurity, at systems servicing'
              : 'Verified credentials in ICT proficiency, software engineering, cybersecurity & systems servicing'}
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
          {isFil
            ? `${certifications.length} Kredensyal`
            : `${certifications.length} Verified Credentials`}
        </span>
      </div>

      {/* 3-Column Double-Bordered Non-Clickable Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleCerts.map((cert) => (
          <CertificationCard key={cert.id} cert={cert} isFil={isFil} />
        ))}
      </div>

      {/* Expand / Collapse Remaining Certificates */}
      {otherCerts.length > 0 && (
        <div className="pt-1">
          <button
            type="button"
            onMouseEnter={playHover}
            onClick={() => {
              playClick()
              setShowAll((prev) => !prev)
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Award size={14} className="text-zinc-400 shrink-0" />
              <span>
                {showAll
                  ? isFil
                    ? 'Ipakita lamang ang pangunahing 6 na sertipikasyon'
                    : 'Show top 6 featured credentials'
                  : isFil
                    ? `Tingnan ang lahat ng ${certifications.length} sertipikasyon (+${otherCerts.length} TESDA, SOC Defense & AMA)`
                    : `View all ${certifications.length} credentials (+${otherCerts.length} TESDA, SOC Defense & AMA)`}
              </span>
            </span>
            <ChevronDown
              size={15}
              className={`shrink-0 transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}
    </section>
  )
}
