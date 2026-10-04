import { education } from '../data/experience'
import { CollapsibleSection } from './Section'
import { useUi } from '../i18n/useUi'

export default function Education() {
  const { ui, t } = useUi()

  return (
    <CollapsibleSection id="background" title={ui.background}>
      <div className="mb-5">
        <h3 className="text-base font-semibold">{t(education.degree)}</h3>
        <p className="t-muted text-sm">
          {t(education.school)} · {education.year}
        </p>
      </div>

      <div>
        <h4 className="t-faint mb-2 text-sm font-medium">{ui.additionalTraining}</h4>
        <ul className="space-y-1.5 text-sm leading-relaxed">
          {education.additional.map((item: string) => (
            <li key={item} className="flex gap-2">
              <span className="t-accent shrink-0" aria-hidden="true">
                —
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere]">{t(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    </CollapsibleSection>
  )
}