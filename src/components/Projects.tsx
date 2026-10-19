import { Github, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { CollapsibleSection } from './Section'
import { useUi } from '../i18n/useUi'

export default function Projects() {
  const { ui, t } = useUi()

  return (
    <CollapsibleSection id="work" title={ui.selectedWork} defaultOpen>
      <ul className="divide-y rule">
        {projects.map((project) => (
          <li key={project.index} className="py-6 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
              <h3 className="text-base font-semibold [overflow-wrap:anywhere]">
                {t(project.name)}
                {project.fullName && (
                  <span className="t-muted font-normal"> — {t(project.fullName)}</span>
                )}
              </h3>
              {project.category && (
                <span className="t-faint font-mono text-xs">{project.category}</span>
              )}
            </div>
            <p className="t-muted mt-2 text-sm leading-relaxed">{t(project.description)}</p>

            {project.focus && project.focus.length > 0 && (
              <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs t-faint">
                {project.focus.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="t-accent" aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {project.note && (
              <p className="t-faint mt-2 text-xs italic leading-relaxed">{t(project.note)}</p>
            )}

            <ul className="mt-3 flex flex-wrap gap-2" aria-label={ui.technologiesUsed(t(project.name))}>
              {project.technologies.map((tech) => (
                <li key={tech} className="tag !text-xs">
                  {tech}
                </li>
              ))}
            </ul>

            {(project.repo || project.live) && (
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow min-h-[36px] text-sm"
                  >
                    <Github size={13} aria-hidden="true" />
                    GitHub
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow min-h-[36px] text-sm"
                  >
                    {ui.liveDemo}
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  )
}