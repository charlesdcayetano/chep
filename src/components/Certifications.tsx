import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { certifications } from '../data/certifications'
import { useUi } from '../i18n/useUi'

export default function Certifications() {
  const { ui, t } = useUi()

  return (
    <section id="certifications" className="scroll-mt-28 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display">
          {ui.certifications}
        </h2>
        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">Credentials</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="group flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck aria-hidden="true" size={14} className="text-emerald-500 shrink-0" />
                  <span>{cert.date || cert.year}</span>
                </span>
                {cert.credentialId && (
                  <span className="text-[10px] font-mono bg-zinc-200/70 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
                    ID: {cert.credentialId}
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-foreground">
                {t(cert.name)}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {t(cert.issuer)}
              </p>
            </div>

            {(cert.fileUrl || cert.url) && (
              <div className="mt-3 pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800/80 flex justify-end">
                <a
                  href={cert.fileUrl || cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
                >
                  <span>View Certificate</span>
                  <ArrowUpRight aria-hidden="true" size={12} className="text-muted-foreground" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}