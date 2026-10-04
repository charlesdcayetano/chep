import { Section } from './Section'
import { translations } from '../i18n/translations'

type Language = keyof typeof translations

export default function About() {
  const language: Language = 'en'
  const copy = translations[language]
  const ui = {
    aboutCurrentLabel: 'Currently',
    aboutCurrent: copy.availability,
  }

  return (
    <Section id="about" title={copy.aboutHeading}>
      <div className="max-w-content space-y-4 text-base leading-relaxed t-muted">
        <p>{copy.aboutIntro}</p>
        <p>{copy.heroStatement}</p>
        <p>{copy.heroSupporting}</p>
        {copy.about.map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="surface mt-6 max-w-content rounded-r-xl border border-l-[3px] rule !border-l-[#B45309] py-3.5 pl-4 pr-4 dark:!border-l-[#F59E0B]">
        <p className="t-accent mb-1 text-sm font-semibold">{ui.aboutCurrentLabel}</p>
        <p className="text-base leading-relaxed">{ui.aboutCurrent}</p>
      </div>
    </Section>
  )
}