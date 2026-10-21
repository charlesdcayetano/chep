import { GraduationCap, Award } from 'lucide-react'
import { education } from '../data/experience'
import { useUi } from '../i18n/useUi'

export default function Education() {
  const { ui, t } = useUi()

  return (
    <section id="education" className="scroll-mt-28 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display">
          {ui.background}
        </h2>
        <span className="text-xs font-mono text-zinc-400">Academic</span>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-foreground shadow-xs">
            <GraduationCap size={20} />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base sm:text-lg">
              {t(education.degree)}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              {t(education.school)} • Class of {education.year}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            {ui.additionalTraining}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
            {education.additional.map((item, idx) => (
              <div
                key={idx}
                className="skill-inner-shadow flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-700 dark:text-zinc-300"
              >
                <Award size={14} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
                <span>{t(item)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}