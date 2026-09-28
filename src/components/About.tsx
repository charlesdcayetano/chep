import { translations } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-8 border-t border-[#E5E5E5] dark:border-[#2A2A2A]"
    >
      <h2 id="about-heading" className="text-2xl font-bold tracking-tight mb-5">
        {t.aboutHeading}
      </h2>

      <div className="space-y-4 max-w-content text-base leading-relaxed text-[#666666] dark:text-[#A3A3A3]">
        <p>{t.aboutIntro}</p>
        <p>{t.heroStatement}</p>
        <p>{t.heroSupporting}</p>
        {t.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}