import { useState } from 'react'
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  ChevronDown,
  CheckCircle2,
  FileText,
  Building2,
} from 'lucide-react'
import { certifications } from '../data/certifications'
import { useUi } from '../i18n/useUi'

export default function Certifications() {
  const { ui, t } = useUi()
  const [showAll, setShowAll] = useState(false)

  // Primary featured certifications as requested by user
  const featuredCerts = certifications.filter((c) => c.featured)
  const otherCerts = certifications.filter((c) => !c.featured)

  return (
    <section id="certifications" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display">
            {ui.certifications}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Key government ICT proficiency credentials and intensive software residencies
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
          0{featuredCerts.length} Featured Credentials
        </span>
      </div>

      {/* Primary 2-Preview Featured Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featuredCerts.map((cert) => (
          <div
            key={cert.name}
            className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/80 p-5 sm:p-6 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-md"
          >
            <div className="space-y-3.5">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                  <span>{cert.badge || 'Verified'}</span>
                </span>
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  {cert.date || cert.year}
                </span>
              </div>

              {/* Title & Issuer */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-foreground font-display leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t(cert.name)}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                  <Building2 size={13} className="text-zinc-400 shrink-0" />
                  <span>{t(cert.issuer)}</span>
                </p>
              </div>

              {/* Description */}
              {cert.description && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  {cert.description}
                </p>
              )}

              {/* Verified Competencies */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block mb-1.5">
                    Demonstrated Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                      >
                        <CheckCircle2 size={11} className="text-emerald-500" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions / Credentials */}
            <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              {cert.credentialId ? (
                <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                  ID: {cert.credentialId}
                </span>
              ) : (
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Award size={12} />
                  <span>Conferred Passer</span>
                </span>
              )}

              {cert.fileUrl ? (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium text-xs hover:opacity-90 transition-opacity shadow-2xs"
                >
                  <FileText size={13} />
                  <span>View Certificate</span>
                  <ArrowUpRight size={11} />
                </a>
              ) : (
                <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                  Government Validated
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Optional Collapsible View for Remaining Certifications */}
      {otherCerts.length > 0 && (
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Award size={14} className="text-zinc-400" />
              <span>
                {showAll
                  ? 'Hide additional credentials'
                  : `View ${otherCerts.length} additional technical certificates (TESDA, Microsoft, AMA)`}
              </span>
            </span>
            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
            />
          </button>

          {showAll && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 animate-in fade-in duration-200">
              {otherCerts.map((cert) => (
                <div
                  key={cert.name}
                  className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/40 flex flex-col justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                      <span>{cert.date || cert.year}</span>
                      {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                    </div>
                    <h4 className="text-xs font-semibold text-foreground leading-snug">
                      {t(cert.name)}
                    </h4>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{t(cert.issuer)}</p>
                  </div>

                  {cert.fileUrl && (
                    <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex justify-end">
                      <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground hover:underline"
                      >
                        <span>View PDF</span>
                        <ArrowUpRight size={11} className="text-zinc-400" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}