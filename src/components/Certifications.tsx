import { ArrowUpRight } from 'lucide-react'
import { certifications } from '../data/certifications'
import { CollapsibleSection } from './Section'
import { useUi } from '../i18n/useUi'

export default function Certifications() {
  const { ui, t } = useUi()

  return (
    <CollapsibleSection id="certifications" title={ui.certifications}>
      <ul className="space-y-4">
        {certifications.map((cert) => (
          <li
            key={cert.name}
            className="flex flex-col gap-1 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <div className="min-w-0 [overflow-wrap:anywhere]">
              <span className="font-medium">{t(cert.name)}</span>
              <span className="t-muted"> — {t(cert.issuer)}</span>
            </div>
            <div className="t-faint flex shrink-0 items-center gap-3 font-mono text-xs">
              <span>{cert.year}</span>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow min-h-[36px] !font-sans"
                >
                  {ui.verify} <ArrowUpRight size={10} aria-hidden="true" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  )
}