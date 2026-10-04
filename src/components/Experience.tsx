import { experience } from '../data/experience'
import { currentJob } from '../data/currentJob'
import { CollapsibleSection } from './Section'
import { useUi } from '../i18n/useUi'

/** "Acme Corp" -> "AC", "PVDCI" -> "PV" */
function monogram(org: string): string {
  const words = org.split(/\s+/).filter(Boolean)
  const letters = words.length > 1 ? words.map((w) => w[0]).join('') : org
  return letters.slice(0, 2).toUpperCase()
}

interface Entry {
  key: string
  role: string
  org: string
  location?: string
  period: string
  description: string[]
  current?: boolean
}

export default function Experience() {
  const { ui, t } = useUi()

  const entries: Entry[] = [
    {
      key: 'current',
      role: t(currentJob.role),
      org: currentJob.org,
      location: currentJob.location ? t(currentJob.location) : undefined,
      period: t(currentJob.period),
      description: currentJob.description.map((line) => t(line)),
      current: true,
    },
    ...experience
      // If you already added PVDCI to data/experience, the dedicated entry above wins.
      .filter((item) => !/pvdci/i.test(String(item.org)))
      .map((item) => ({
        key: `${item.org}-${item.role}`,
        role: t(item.role),
        org: t(item.org),
        location: item.location ? t(item.location) : undefined,
        period: t(item.period),
        description: item.description.map((line: string) => t(line)),
      })),
  ]

  return (
    <CollapsibleSection id="experience" title={ui.experience} defaultOpen>
      {/* A real sequence (newest first), so a timeline is the right structure. */}
      <ol className="relative ml-1.5 border-l rule">
        {entries.map((item) => (
          <li key={item.key} className="relative pb-8 pl-6 last:pb-0 sm:pl-8">
            <span
              aria-hidden="true"
              className={`absolute -left-[6px] top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
                item.current
                  ? 'bg-accent border-[#FAFAFA] dark:border-[#111111]'
                  : 'border-[#A3A3A3] bg-[#FAFAFA] dark:border-[#525252] dark:bg-[#111111]'
              }`}
            />
            <p className="t-faint font-mono text-xs">{item.period}</p>

            <div className="mt-2 flex items-start gap-3">
              <span
                aria-hidden="true"
                className="surface grid h-9 w-9 shrink-0 place-items-center rounded-lg border rule text-[11px] font-bold"
              >
                {monogram(item.org)}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold leading-snug [overflow-wrap:anywhere]">
                  {item.role}
                </h3>
                <p className="t-muted text-sm [overflow-wrap:anywhere]">
                  @{item.org.replace(/^@/, '')}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
              </div>
            </div>

            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
              {item.description.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span className="t-accent shrink-0" aria-hidden="true">
                    —
                  </span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">{line}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </CollapsibleSection>
  )
}